const statusClasses = {
  'En stock': 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'Stock faible': 'bg-amber-50 text-amber-700 ring-amber-100',
  'En rupture': 'bg-rose-50 text-rose-700 ring-rose-100',
}

function MedicineStatus({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusClasses[status] || statusClasses['En stock']}`}>{status}</span>
}

export default MedicineStatus
