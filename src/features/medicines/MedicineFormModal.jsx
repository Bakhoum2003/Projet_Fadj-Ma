import { useState } from 'react'
import Modal from '../../components/ui/Modal.jsx'

const initialForm = {
  name: '', description: '', dosage: '', price: '', posology: '', activeIngredients: '', sideEffects: '', pharmaceuticalForm: '',
}

function Field({ label, name, value, onChange, textarea = false, placeholder }) {
  const commonProps = { id: name, name, value, onChange, placeholder, className: 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100' }
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>{textarea ? <textarea rows="3" {...commonProps} /> : <input {...commonProps} />}</label>
}

function MedicineFormModal({ onClose, onSave }) {
  const [form, setForm] = useState(initialForm)
  const [imagePreview, setImagePreview] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0]
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({ ...form, image: imagePreview })
  }

  return (
    <Modal onClose={onClose} labelledBy="medicine-form-title" size="max-w-5xl">
      <button type="button" onClick={onClose} aria-label="Fermer le formulaire" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-xl text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900">×</button>
      <form onSubmit={handleSubmit}>
        <label className="group relative flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-t-[1.75rem] border-b border-slate-200 bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 px-6 py-10 text-center transition hover:from-sky-100 hover:to-cyan-100 sm:min-h-56">
          {imagePreview ? <img src={imagePreview} alt="Prévisualisation du médicament" className="absolute inset-0 size-full object-cover" /> : <><span className="grid size-16 place-items-center rounded-2xl bg-white text-3xl font-light text-sky-700 shadow-sm ring-1 ring-sky-100 transition group-hover:scale-105">+</span><span className="mt-4 text-base font-bold text-slate-800">Ajouter une image</span><span className="mt-1 text-sm text-slate-500">PNG, JPG ou WEBP</span></>}
          {imagePreview && <span className="relative rounded-full bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white">Modifier l’image</span>}
          <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={handleImageChange} />
        </label>

        <div className="p-5 sm:p-8">
          <div className="mb-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Obligatoire</p><h2 id="medicine-form-title" className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Ajouter un médicament</h2><p className="mt-1 text-sm text-slate-500">Donnez le plus de détails possible pour enrichir votre inventaire.</p></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom du médicament" name="name" value={form.name} onChange={handleChange} placeholder="Ex. Doliprane 1000 mg" />
            <Field label="Description" name="description" value={form.description} onChange={handleChange} textarea placeholder="Description courte du médicament" />
            <Field label="Dosage" name="dosage" value={form.dosage} onChange={handleChange} placeholder="Ex. 500 mg" />
            <Field label="Prix (FCFA)" name="price" value={form.price} onChange={handleChange} placeholder="Ex. 2 500" />
            <Field label="Posologie" name="posology" value={form.posology} onChange={handleChange} textarea placeholder="Conseils d’utilisation" />
            <Field label="Forme pharmaceutique" name="pharmaceuticalForm" value={form.pharmaceuticalForm} onChange={handleChange} placeholder="Ex. Comprimé, sirop…" />
          </div>
          <div className="mt-5 grid gap-5"><Field label="Ingrédients actifs" name="activeIngredients" value={form.activeIngredients} onChange={handleChange} textarea placeholder="Substances actives et concentration" /><Field label="Effets secondaires" name="sideEffects" value={form.sideEffects} onChange={handleChange} textarea placeholder="Effets indésirables connus" /></div>
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50">Annuler</button><button type="submit" className="h-11 rounded-xl bg-[#0b83a8] px-5 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-[#086e91]">Enregistrer</button></div>
        </div>
      </form>
    </Modal>
  )
}

export default MedicineFormModal
