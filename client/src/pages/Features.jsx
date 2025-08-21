// [file name]: Features.jsx
// [new file]
export default function Features() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black">New Features</h2>
      
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Real-time Sentiment Detection</h3>
        <p className="text-gray-700 mb-4">
          Now you can see sentiment analysis results as you type, with instant feedback.
        </p>
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Try typing in the Lab to see it in action!</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Multi-mode Comparison</h3>
        <p className="text-gray-700 mb-4">
          Compare results from all three sentiment analysis methods side-by-side.
        </p>
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Available in the Lab's comparison view.</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Batch Processing</h3>
        <p className="text-gray-700 mb-4">
          Analyze multiple sentences at once and get an overall sentiment summary.
        </p>
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Check the new Batch Analysis tab in the Lab.</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Historical Dashboard</h3>
        <p className="text-gray-700 mb-4">
          Your analysis history is now saved and visualized in a dashboard.
        </p>
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">View your history in the new Dashboard section.</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Multi-language Support</h3>
        <p className="text-gray-700 mb-4">
          Now supporting both English and Hindi sentiment analysis.
        </p>
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Use the language selector in the navigation.</p>
        </div>
      </div>
    </div>
  )
}