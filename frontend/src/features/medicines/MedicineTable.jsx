import MedicineImage from './MedicineImage.jsx'
import MedicineStatus from './MedicineStatus.jsx'

function MedicineTable({ medicines, onViewDetails }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
        <thead><tr className="text-xs uppercase tracking-wider text-slate-500"><th className="border-b border-slate-200 px-4 py-4 font-bold">Médicament</th><th className="border-b border-slate-200 px-4 py-4 font-bold">Identifiant</th><th className="border-b border-slate-200 px-4 py-4 font-bold">Groupe</th><th className="border-b border-slate-200 px-4 py-4 font-bold">Stock</th><th className="border-b border-slate-200 px-4 py-4 font-bold">Statut</th><th className="border-b border-slate-200 px-4 py-4 font-bold">Action</th></tr></thead>
        <tbody>
          {medicines.map((medicine) => <tr key={medicine.id} className="group text-sm transition hover:bg-sky-50/60"><td className="border-b border-slate-100 px-4 py-3"><div className="flex items-center gap-3"><MedicineImage medicine={medicine} className="size-10 shrink-0 rounded-xl" /><span className="font-semibold text-slate-800">{medicine.name}</span></div></td><td className="border-b border-slate-100 px-4 py-4 font-mono text-xs text-slate-500">{medicine.id}</td><td className="border-b border-slate-100 px-4 py-4 text-slate-600">{medicine.category}</td><td className="border-b border-slate-100 px-4 py-4 font-semibold text-slate-700">{medicine.stock}</td><td className="border-b border-slate-100 px-4 py-4"><MedicineStatus status={medicine.status} /></td><td className="border-b border-slate-100 px-4 py-4"><button type="button" onClick={() => onViewDetails(medicine)} className="font-semibold text-sky-700 transition hover:text-sky-900">Détails →</button></td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default MedicineTable
