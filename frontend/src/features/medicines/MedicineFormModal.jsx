import { useState } from 'react'
import Modal from '../../components/ui/Modal.jsx'

const emptyForm = { name: '', description: '', dosage: '', price: '', image: '', posology: '', activeIngredients: '', sideEffects: '', pharmaceuticalForm: '', quantity: '0' }

function toForm(medicine) {
  if (!medicine) return emptyForm
  return {
    name: medicine.name || '', description: medicine.description || '', dosage: medicine.dosage || '', price: medicine.price ?? '', image: medicine.image || '', posology: medicine.posology || '',
    activeIngredients: Array.isArray(medicine.activeIngredients) ? medicine.activeIngredients.join(', ') : medicine.activeIngredients || '',
    sideEffects: Array.isArray(medicine.sideEffects) ? medicine.sideEffects.join(', ') : medicine.sideEffects || '',
    pharmaceuticalForm: medicine.pharmaceuticalForm || '', quantity: medicine.quantity ?? '0',
  }
}

function Field({ label, name, value, onChange, textarea = false, placeholder, type = 'text', min, step }) {
  const commonProps = { id: name, name, value, onChange, placeholder, type, min, step, className: 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100' }
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>{textarea ? <textarea rows="3" {...commonProps} /> : <input {...commonProps} />}</label>
}

function MedicineFormModal({ medicine, onClose, onSave }) {
  const [form, setForm] = useState(() => toForm(medicine))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const isEditing = Boolean(medicine)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const price = Number(form.price)
    const quantity = Number(form.quantity)
    if (!form.name.trim() || form.price === '' || !Number.isFinite(price) || price < 0 || !Number.isInteger(quantity) || quantity < 0) {
      setError('Renseignez un nom, un prix valide et une quantité entière positive ou nulle.')
      return
    }

    setLoading(true)
    try {
      const saved = await onSave({
        ...form,
        name: form.name.trim(), price, quantity,
        activeIngredients: form.activeIngredients.split(',').map((item) => item.trim()).filter(Boolean),
        sideEffects: form.sideEffects.split(',').map((item) => item.trim()).filter(Boolean),
      })
      if (!saved) return
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal onClose={onClose} labelledBy="medicine-form-title" size="max-w-5xl">
      <button type="button" onClick={onClose} aria-label="Fermer le formulaire" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-xl text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900">×</button>
      <form onSubmit={handleSubmit}>
        <div className="rounded-t-[1.75rem] border-b border-slate-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 px-6 py-8 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">{isEditing ? 'Mise à jour' : 'Nouveau médicament'}</p>
          <h2 id="medicine-form-title" className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{isEditing ? 'Modifier le médicament' : 'Ajouter un médicament'}</h2>
          <p className="mt-1 text-sm text-slate-500">L’image est actuellement enregistrée sous la forme d’une URL.</p>
        </div>
        <div className="p-5 sm:p-8">
          {error && <p role="alert" className="mb-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 ring-1 ring-rose-100">{error}</p>}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom du médicament *" name="name" value={form.name} onChange={handleChange} placeholder="Ex. Doliprane 1000 mg" />
            <Field label="Prix (FCFA) *" name="price" value={form.price} onChange={handleChange} type="number" min="0" step="1" placeholder="Ex. 2 500" />
            <Field label="Quantité *" name="quantity" value={form.quantity} onChange={handleChange} type="number" min="0" step="1" placeholder="Ex. 25" />
            <Field label="Dosage" name="dosage" value={form.dosage} onChange={handleChange} placeholder="Ex. 500 mg" />
            <Field label="Forme pharmaceutique" name="pharmaceuticalForm" value={form.pharmaceuticalForm} onChange={handleChange} placeholder="Ex. Comprimé, sirop…" />
            <Field label="URL de l’image" name="image" value={form.image} onChange={handleChange} placeholder="https://…" />
            <Field label="Description" name="description" value={form.description} onChange={handleChange} textarea placeholder="Description courte du médicament" />
            <Field label="Posologie" name="posology" value={form.posology} onChange={handleChange} textarea placeholder="Conseils d’utilisation" />
          </div>
          <div className="mt-5 grid gap-5"><Field label="Ingrédients actifs" name="activeIngredients" value={form.activeIngredients} onChange={handleChange} textarea placeholder="Séparez les ingrédients par des virgules" /><Field label="Effets secondaires" name="sideEffects" value={form.sideEffects} onChange={handleChange} textarea placeholder="Séparez les effets par des virgules" /></div>
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end"><button type="button" disabled={loading} onClick={onClose} className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60">Annuler</button><button disabled={loading} type="submit" className="h-11 rounded-xl bg-[#0b83a8] px-5 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-[#086e91] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Enregistrement…' : 'Enregistrer'}</button></div>
        </div>
      </form>
    </Modal>
  )
}

export default MedicineFormModal
