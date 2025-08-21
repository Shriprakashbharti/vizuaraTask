export default function ProgressBar({ value=0 }){
  return (
    <div className="w-full h-4 bg-emerald-100 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-500 transition-all" style={{width: `${value}%`}} />
    </div>
  )
}
