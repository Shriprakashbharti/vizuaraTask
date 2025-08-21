export default function About(){
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black">About This Project</h2>
      <p className="text-gray-700">
        This educational app teaches Sentiment Analysis concepts to middle school students using interactive stories, 
        engaging quizzes, and a hands-on live lab. Students can explore how computers can detect emotions in text through
        multiple approaches.
      </p>
      
      <h3 className="text-xl font-bold text-emerald-700">Features Include:</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Interactive story mode with characters Zuzu and Max</li>
        <li>Multiple analysis methods: Rule-based, Naive Bayes, and Hugging Face API</li>
        <li>Real-time sentiment detection as you type</li>
        <li>Multi-language support (English and Hindi)</li>
        <li>Batch processing for analyzing multiple sentences</li>
        <li>Historical analysis dashboard</li>
        <li>Color-coded sentiment visualization</li>
      </ul>

      <h3 className="text-xl font-bold text-emerald-700">Technical Implementation:</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Built with React + Vite + Tailwind CSS (frontend)</li>
        <li>Node.js/Express backend with MongoDB integration</li>
        <li>Hugging Face API for advanced sentiment analysis</li>
        <li>Responsive design for all device sizes</li>
        <li>Works offline with local analysis methods</li>
      </ul>

      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
        <h3 className="text-lg font-bold text-emerald-800">Created By:</h3>
        <p className="text-emerald-700 mt-2">
          This project was developed by <strong>Shri Prakash Baitha  (shriprakashbaitha59@gmail.com)</strong> as an educational tool to make 
          sentiment analysis concepts accessible and engaging for young learners.
        </p>
        <p className="text-emerald-700 mt-2">
          The application demonstrates how natural language processing can be taught in a fun, 
          interactive way while maintaining technical accuracy.
        </p>
      </div>
    </div>
  )
}