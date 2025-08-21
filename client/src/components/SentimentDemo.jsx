// [file name]: SentimentDemo.jsx
// [updated file for real-time analysis]
import { useEffect, useMemo, useState } from "react";
import { classifyRule } from "../lib/lexicon";
import { makeNB, largerTrainData } from "../lib/naiveBayes";
import { hfSentiment } from "../lib/hfClient";
import Badge from "./Badge";
import { saveAnalysis } from "../lib/db";

export default function SentimentDemo({ compact = false }) {
  const [text, setText] = useState(
    "I love sunny picnics but hate mosquito bites."
  );
  const [mode, setMode] = useState("rule"); // "rule" | "nb" | "hf"
  const [result, setResult] = useState({ label: "neutral", score: 0.5 });
  const [loading, setLoading] = useState(false);

  // Local Naive Bayes
  const nb = useMemo(() => makeNB(largerTrainData), []);

  // Analyze text with debouncing
  useEffect(() => {
    if (!text.trim()) {
      setResult({ label: "neutral", score: 0.5 });
      return;
    }

    const analyzeText = async () => {
      setLoading(true);
      let analysisResult;

      try {
        if (mode === "rule") {
          analysisResult = classifyRule(text);
        } else if (mode === "nb") {
          analysisResult = nb.classify(text);
        } else if (mode === "hf") {
          analysisResult = await hfSentiment(text);
        }

        setResult(analysisResult);
        saveAnalysis(text, mode, analysisResult);
      } catch (error) {
        console.error("Analysis error:", error);
        setResult({ label: "error", score: 0 });
      } finally {
        setLoading(false);
      }
    };

    // Debounce to avoid too many API calls
    const timeoutId = setTimeout(analyzeText, mode === "hf" ? 800 : 300);
    return () => clearTimeout(timeoutId);
  }, [text, mode, nb]);

  const tone = result.label;
  const score =
    typeof result.score === "number" ? result.score.toFixed(2) : result.score;

  return (
    <div className={`card ${compact ? "p-4" : "p-6"} space-y-4`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-extrabold">Try it yourself!</h3>

        {/* Mode Switcher */}
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="rounded-xl border px-3 py-2 bg-emerald-50"
        >
          <option value="rule">Rule-based</option>
          <option value="nb">Naive Bayes</option>
          <option value="hf">Hugging Face</option>
        </select>
      </div>

      <textarea
        className="w-full rounded-2xl border p-4 outline-none focus:ring-4 focus:ring-emerald-200"
        rows={compact ? 3 : 4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a sentence... e.g., This pizza is awesome!"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500"></div>
          ) : (
            <Badge tone={tone}>{tone.toUpperCase()}</Badge>
          )}
          <span className="text-sm text-gray-500">
            {loading ? "analyzing..." : `confidence: ${score}`}
          </span>
        </div>
        <div className="text-3xl">
          {loading ? "⏳" : tone === "positive" ? "😄" : tone === "negative" ? "😟" : "😐"}
        </div>
      </div>
    </div>
  );
}