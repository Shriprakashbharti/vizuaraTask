export default function Toggle({ checked, onChange, left='Rule-based', right='Naive Bayes' }){
  return (
    <div className="inline-flex items-center gap-2">
      <span className={`text-sm ${!checked ? 'font-bold text-emerald-700' : ''}`}>{left}</span>
      <button onClick={()=>onChange(!checked)} className="px-1 py-1 bg-emerald-100 rounded-full">
        <span className={`block w-8 h-8 bg-white shadow rounded-full transition-transform ${checked ? 'translate-x-8' : ''}`}></span>
      </button>
      <span className={`text-sm ${checked ? 'font-bold text-emerald-700' : ''}`}>{right}</span>
    </div>
  )
}
