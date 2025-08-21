import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { MongoClient, ServerApiVersion } from 'mongodb';
import { hfSentiment } from './hfClient.js'; // Ensure hfClient.js is present and uses ES modules

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// --- CORS Configuration ---
const corsOptions = {
  origin: [
    'https://sentimentlab.vercel.app', // Your Vercel deployment
    'http://localhost:3000', // Local development
    'http://localhost:5173' // Common Vite dev server port
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// --- Middleware ---
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing with specific options
app.use(express.json()); // Parse JSON request bodies

// Optional: Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// --- MongoDB Connection (commented out) ---
// const uri = process.env.MONGODB_URI;
// if (!uri) {
//   console.error("FATAL ERROR: MONGODB_URI is not defined in your .env file.");
//   process.exit(1); // Exit the application if the DB connection string is missing
// }

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// let db;

// async function connectDB() {
//   try {
//     await client.connect();
//     db = client.db('sentimentLab'); // Use the 'sentimentLab' database
//     console.log('Successfully connected to MongoDB.');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error);
//     process.exit(1); // Exit the application on a failed connection
//   }
// }

// // Connect to the database when the server starts
// connectDB();

// --- API Routes ---

/**
 * @route   POST /api/hf-sentiment
 * @desc    Analyzes a single piece of text using the Hugging Face API.
 * This is used for real-time, single-sentence feedback.
 */
app.post('/api/hf-sentiment', cors(corsOptions), async (req, res) => {
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
app.post('/api/analysis', cors(corsOptions), async (req, res) => {
    // if (!db) {
    //     return res.status(503).json({ error: 'Database not available' });
    // }
    try {
        const { text, results } = req.body;
        if (!text || !results) {
            return res.status(400).json({ error: 'Text and results are required' });
        }

        // Mock database response since MongoDB is commented out
        const analysisRecord = {
            text,
            ruleResult: results.rule,
            nbResult: results.nb,
            hfResult: results.hf,
            timestamp: new Date(),
            id: Date.now() // Mock ID
        };

        // Mock save operation
        // const saved = await db.collection('analyses').insertOne(analysisRecord);
        res.status(201).json({ 
          insertedId: analysisRecord.id, 
          analysis: analysisRecord,
          message: "Mock save successful (MongoDB disabled)" 
        });

    } catch(error) {
        console.error('Database save error:', error);
        res.status(500).json({ error: 'Failed to save analysis' });
    }
});

/**
 * @route   GET /api/history
 * @desc    Retrieves the last 50 analysis records from the database.
 */
app.get('/api/history', cors(corsOptions), async (req, res) => {
  // if (!db) {
  //   return res.status(503).json({ error: 'Database not available' });
  // }
  try {
    // Mock history data since MongoDB is commented out
    const mockHistory = [
      {
        id: 1,
        text: "Sample analysis 1",
        ruleResult: { label: "positive", score: 0.8 },
        nbResult: { label: "positive", score: 0.75 },
        hfResult: { label: "positive", score: 0.85 },
        timestamp: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: 2,
        text: "Sample analysis 2",
        ruleResult: { label: "negative", score: 0.7 },
        nbResult: { label: "negative", score: 0.65 },
        hfResult: { label: "negative", score: 0.75 },
        timestamp: new Date(Date.now() - 172800000) // 2 days ago
      }
    ];

    // const history = await db.collection('analyses')
    //   .find()
    //   .sort({ timestamp: -1 }) // Get the most recent entries first
    //   .limit(50)
    //   .toArray();

    res.json(mockHistory);
  } catch (error) {
    console.error('Database history fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

/**
 * @route   GET /health
 * @desc    A simple health check endpoint to verify the server is running.
 */
app.get('/health', cors(corsOptions), (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    db_connected: false, // Set to false since MongoDB is commented out
    cors_enabled: true,
    allowed_origins: corsOptions.origin
  });
});

app.get("/", cors(corsOptions), (req, res) => {
  res.send("It's Working");
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`CORS enabled for: ${corsOptions.origin.join(', ')}`);
});