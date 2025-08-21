import { makeEnhancedNB, batchClassify, evaluateModel } from './sentimentModel';

// Create model
const nbModel = makeEnhancedNB();

// Single prediction
const result = nbModel.classify("I absolutely love this wonderful product");
console.log(result);
// Output: { label: "positive", score: 0.9562, probabilities: {...} }

// Batch processing
const texts = ["I love this", "I hate this", "This is a book"];
const batchResults = batchClassify(texts, nbModel);

// Model evaluation
const testData = [
  ["I really like this", "positive"],
  ["This is terrible", "negative"], 
  ["The door is blue", "neutral"]
];
const evaluation = evaluateModel(testData, nbModel);
console.log(`Accuracy: ${evaluation.accuracy * 100}%`);

// Model analysis
console.log("Vocabulary size:", nbModel.getVocabularySize());
console.log("Most important positive words:", nbModel.getMostImportantWords('positive'));
console.log("Class distribution:", nbModel.getClassDistribution());