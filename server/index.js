import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from 'mongodb';
import { hfSentiment } from './hfClient.js'; // Ensure hfClient.js is present and uses ES modules

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// --- MongoDB Connection ---
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("FATAL ERROR: MONGODB_URI is not defined in your .env file.");
  process.exit(1); // Exit the application if the DB connection string is missing
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('sentimentLab'); // Use the 'sentimentLab' database
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the application on a failed connection
  }
}

// Connect to the database when the server starts
connectDB();

// --- API Routes ---

/**
 * @route   POST /api/hf-sentiment
 * @desc    Analyzes a single piece of text using the Hugging Face API.
 * This is used for real-time, single-sentence feedback.
 */
app.post('/api/hf-sentiment', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const result = await hfSentiment(text);
    res.json(result);

  } catch (error) {
    console.error('HF API error:', error);
    res.status(500).json({ error: 'Failed to analyze sentiment' });
  }
});

/**
 * @route   POST /api/analysis
 * @desc    Saves a complete multi-mode analysis result to the database.
 * This is called when the user clicks "Save to History".
 */
app.post('/api/analysis', async (req, res) => {
    if (!db) {
        return res.status(503).json({ error: 'Database not available' });
    }
    try {
        const { text, results } = req.body;
        if (!text || !results) {
            return res.status(400).json({ error: 'Text and results are required' });
        }

        const analysisRecord = {
            text,
            ruleResult: results.rule,
            nbResult: results.nb,
            hfResult: results.hf,
            timestamp: new Date()
        };

        const saved = await db.collection('analyses').insertOne(analysisRecord);
        res.status(201).json(saved);

    } catch(error) {
        console.error('Database save error:', error);
        res.status(500).json({ error: 'Failed to save analysis' });
    }
});


/**
 * @route   GET /api/history
 * @desc    Retrieves the last 50 analysis records from the database.
 */
app.get('/api/history', async (req, res) => {
  if (!db) {
    return res.status(503).json({ error: 'Database not available' });
  }
  try {
    const history = await db.collection('analyses')
      .find()
      .sort({ timestamp: -1 }) // Get the most recent entries first
      .limit(50)
      .toArray();

    res.json(history);
  } catch (error) {
    console.error('Database history fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

/**
 * @route   GET /health
 * @desc    A simple health check endpoint to verify the server is running.
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    db_connected: !!db, // Returns true if db object exists
  });
});

app.get("/",(req,res)=>{
  res.send("It's Working");
})

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
