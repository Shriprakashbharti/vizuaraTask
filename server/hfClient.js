// [file name]: hfClient.js
// [updated backend version]

// Hugging Face Inference API client
export async function hfSentiment(text) {
  const token = process.env.HF_TOKEN;
  const model = process.env.HF_MODEL || "distilbert-base-uncased-finetuned-sst-2-english";

  if (!token) throw new Error("No HF token set in .env file");

  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`HF API error: ${res.status} ${res.statusText} - ${errorBody}`);
  }

  const data = await res.json();

  // Handle the standard classification model response
  if (Array.isArray(data) && Array.isArray(data[0])) {
    // Find the label with the highest score
    const best = data[0].reduce(
        (a, b) => (a.score > b.score ? a : b), 
        { label: "neutral", score: 0.5 }
    );
    
    // Normalize the label to 'positive', 'negative', or 'neutral'
    const label = best.label.toLowerCase().includes("pos")
      ? "positive"
      : best.label.toLowerCase().includes("neg")
      ? "negative"
      : "neutral";
      
    return { label, score: Number(best.score?.toFixed(4) || 0.5) };
  }

  // Fallback for unexpected response formats
  return { label: "neutral", score: 0.5, raw: data };
}
