
export async function hfSentiment(text) {
    const VITE_API_BASE = import.meta.env.VITE_API_BASE

  try {
    const res = await fetch(`${VITE_API_BASE}/api/hf-sentiment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Backend API error: ${res.status} ${res.statusText} - ${errorBody}`);
    }

    const data = await res.json();
    
    // Handle potential error response from our backend
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error("Error calling backend API:", error);
    throw error;
  }
}