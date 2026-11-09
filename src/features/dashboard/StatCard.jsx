const tones = {
  sky: 'bg-sky-50 text-sky-700 ring-sky-100',
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  rose: 'bg-rose-50 text-rose-700 ring-rose-100',
}

function StatCard({ stat }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-10 place-items-center rounded-xl text-lg font-bold ring-1 ${tones[stat.tone]}`} aria-hidden="true">{stat.symbol}</span>
        <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">{stat.detail}</span>
      </div>
      <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900">{stat.value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
    </article>
  )
}

export default StatCard
