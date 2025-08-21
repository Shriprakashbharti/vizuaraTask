// [file name]: test-sentiment.js
// [new file - unit tests]
import { classifyRule } from './src/lib/lexicon'
import { makeNB } from './src/lib/naiveBayes'

// Test rule-based sentiment
console.log('Testing Rule-based Sentiment:')
console.log('Positive test:', classifyRule('I love this amazing product')) // Should be positive
console.log('Negative test:', classifyRule('I hate this terrible product')) // Should be negative
console.log('Neutral test:', classifyRule('This is a normal product')) // Should be neutral
console.log('Mixed test:', classifyRule('I love the design but hate the price')) // Should be neutral

// Test Naive Bayes
console.log('\nTesting Naive Bayes Sentiment:')
const nb = makeNB()
console.log('Positive test:', nb.classify('I love this amazing product')) // Should be positive
console.log('Negative test:', nb.classify('I hate this terrible product')) // Should be negative
console.log('Neutral test:', nb.classify('This is a normal product')) // Should be neutral

// Test Hindi support
console.log('\nTesting Hindi Support:')
console.log('Positive Hindi:', classifyRule('यह उत्पाद अद्भुत है')) // Should be positive
console.log('Negative Hindi:', classifyRule('यह उत्पाद भयानक है')) // Should be negative