import Modal from '../../components/ui/Modal.jsx'
import MedicineImage from './MedicineImage.jsx'
import MedicineStatus from './MedicineStatus.jsx'

function DetailItem({ label, value }) {
  return <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1.5 text-sm leading-6 text-slate-700">{value || 'Non renseigné'}</dd></div>
}

function MedicineDetailsModal({ medicine, onClose, onEdit, onDelete, deleting = false }) {
  return (
    <Modal onClose={onClose} labelledBy="medicine-details-title" size="max-w-5xl">
      <button type="button" onClick={onClose} aria-label="Fermer la fiche détaillée" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-xl text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900">×</button>
      <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
        <div className="min-h-60 bg-sky-50 p-6 sm:p-10 lg:min-h-full"><MedicineImage medicine={medicine} className="mx-auto aspect-square w-full max-w-sm rounded-3xl shadow-sm ring-1 ring-sky-100" /></div>
        <div className="p-6 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Fiche médicament</p><h2 id="medicine-details-title" className="mt-2 pr-10 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{medicine.name}</h2><p className="mt-2 text-sm font-medium text-sky-800">{medicine.dosage || 'Dosage non renseigné'} · {medicine.pharmaceuticalForm || medicine.category}</p><p className="mt-6 text-sm leading-7 text-slate-600">{medicine.description || 'Aucune description disponible pour ce médicament.'}</p>
          <section className="mt-8"><h3 className="text-base font-bold text-slate-900">Informations médicales</h3><dl className="mt-3 grid gap-3 sm:grid-cols-2"><DetailItem label="Posologie" value={medicine.posology} /><DetailItem label="Ingrédients actifs" value={Array.isArray(medicine.activeIngredients) ? medicine.activeIngredients.join(', ') : medicine.activeIngredients} /><DetailItem label="Effets secondaires" value={Array.isArray(medicine.sideEffects) ? medicine.sideEffects.join(', ') : medicine.sideEffects} /><DetailItem label="Forme pharmaceutique" value={medicine.pharmaceuticalForm || medicine.category} /></dl></section>
          <section className="mt-7"><h3 className="text-base font-bold text-slate-900">Informations de stock</h3><dl className="mt-3 grid gap-3 sm:grid-cols-3"><DetailItem label="Prix" value={medicine.price !== undefined ? `${medicine.price} FCFA` : undefined} /><DetailItem label="Quantité disponible" value={`${medicine.quantity ?? medicine.stock ?? 0} unités`} /><div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Statut</dt><dd className="mt-2"><MedicineStatus status={medicine.status} /></dd></div></dl></section>
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end"><button type="button" disabled={deleting} onClick={onDelete} className="h-11 rounded-xl border border-rose-200 px-5 text-sm font-bold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60">{deleting ? 'Suppression…' : 'Supprimer'}</button><button type="button" disabled={deleting} onClick={onEdit} className="h-11 rounded-xl bg-[#0b83a8] px-5 text-sm font-bold text-white transition hover:bg-[#086e91] disabled:opacity-60">Modifier</button></div>
        </div>
      </div>
    </Modal>
  )
}

export default MedicineDetailsModal
