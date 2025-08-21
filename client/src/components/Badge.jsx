export default function Badge({ children, tone='neutral' }){
  const map = {
    positive: 'bg-green-100 text-green-800',
    negative: 'bg-rose-100 text-rose-800',
    neutral: 'bg-slate-100 text-slate-800'
  }
  return <span className={`px-3 py-1 rounded-full text-sm font-semibold ${map[tone] || map.neutral}`}>{children}</span>
}
