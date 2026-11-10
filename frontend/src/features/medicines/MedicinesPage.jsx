import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader.jsx'
import MedicineTable from './MedicineTable.jsx'
import { medicines } from './medicinesData.js'
import MedicineFormModal from './MedicineFormModal.jsx'
import MedicineDetailsModal from './MedicineDetailsModal.jsx'

function MedicinesPage() {
  const [medicineList, setMedicineList] = useState(medicines)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)

  function handleAddMedicine(formData) {
    const newMedicine = {
      ...formData,
      id: `MED-${Date.now().toString().slice(-6)}`,
      category: formData.pharmaceuticalForm || 'Nouveau médicament',
      stock: 0,
      status: 'En stock',
    }
    setMedicineList((currentMedicines) => [newMedicine, ...currentMedicines])
    setIsFormOpen(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
      <PageHeader
        eyebrow="Inventaire"
        title="Médicaments"
        description="Gérez les médicaments disponibles à la vente et suivez leurs niveaux de stock."
        action={<button type="button" onClick={() => setIsFormOpen(true)} className="h-11 rounded-xl bg-[#0b83a8] px-4 text-sm font-bold text-white shadow-lg shadow-sky-600/15 transition hover:-translate-y-0.5 hover:bg-[#086e91]">+ Ajouter un médicament</button>}
      />

      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200/70"><p className="text-sm font-medium text-slate-500">Médicaments répertoriés</p><p className="mt-2 text-3xl font-bold text-slate-900">298</p></div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200/70"><p className="text-sm font-medium text-slate-500">Groupes de médicaments</p><p className="mt-2 text-3xl font-bold text-slate-900">24</p></div>
        <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100"><p className="text-sm font-medium text-amber-800">Produits à surveiller</p><p className="mt-2 text-3xl font-bold text-amber-900">09</p></div>
      </section>

      <section className="mt-7 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block md:w-80"><span className="sr-only">Rechercher un médicament</span><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span><input className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Rechercher dans l’inventaire" /></label>
          <select defaultValue="all" className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"><option value="all">Tous les groupes</option><option>Antibiotique</option><option>Allergie</option><option>Médecine générale</option></select>
        </div>
        <div className="mt-5"><MedicineTable medicines={medicineList} onViewDetails={setSelectedMedicine} /></div>
        <footer className="flex flex-col gap-3 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>Affichage de 1 à {medicineList.length} résultats sur {298 + medicineList.length - medicines.length}</p><div className="flex gap-2"><button type="button" className="size-9 rounded-lg border border-slate-200 text-slate-500">←</button><span className="grid size-9 place-items-center rounded-lg bg-sky-700 font-bold text-white">1</span><button type="button" className="size-9 rounded-lg border border-slate-200 text-slate-500">→</button></div></footer>
      </section>
      {isFormOpen && <MedicineFormModal onClose={() => setIsFormOpen(false)} onSave={handleAddMedicine} />}
      {selectedMedicine && <MedicineDetailsModal medicine={selectedMedicine} onClose={() => setSelectedMedicine(null)} />}
    </div>
  )
}

export default MedicinesPage
