import { useCallback, useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/layout/PageHeader.jsx'
import MedicineTable from './MedicineTable.jsx'
import MedicineFormModal from './MedicineFormModal.jsx'
import MedicineDetailsModal from './MedicineDetailsModal.jsx'
import { createMedicine, deleteMedicine, getMedicines, updateMedicine } from '../../services/medicineService.js'
import ConfirmModal from '../../components/ui/ConfirmModal.jsx'
import { useToast } from '../../components/ui/useToast.js'

function getStatus(quantity, threshold = 10) {
  if (quantity === 0) return 'En rupture'
  if (quantity <= threshold) return 'Stock faible'
  return 'En stock'
}

function MedicinesPage({ onUnauthorized }) {
  const [medicineList, setMedicineList] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)
  const [editingMedicine, setEditingMedicine] = useState(null)
  const [medicinePendingDeletion, setMedicinePendingDeletion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [query, setQuery] = useState('')
  const showToast = useToast()

  const loadMedicines = useCallback(async () => {
    try {
      const response = await getMedicines()
      setMedicineList(response.data.map((medicine) => ({ ...medicine, status: getStatus(medicine.quantity) })))
    } catch (requestError) {
      if (requestError.status === 401) onUnauthorized()
      else showToast(requestError.message || 'Impossible de charger les médicaments.', 'error')
    } finally {
      setLoading(false)
    }
  }, [onUnauthorized, showToast])

  // oxlint-disable-next-line react/set-state-in-effect -- la mise à jour intervient après la requête réseau.
  useEffect(() => { loadMedicines() }, [loadMedicines])

  async function handleSave(formData) {
    try {
      if (editingMedicine) {
        const response = await updateMedicine(editingMedicine._id, formData)
        setMedicineList((current) => current.map((medicine) => medicine._id === response.data._id ? { ...response.data, status: getStatus(response.data.quantity) } : medicine))
        showToast('Médicament mis à jour avec succès.', 'success')
      } else {
        const response = await createMedicine(formData)
        setMedicineList((current) => [{ ...response.data, status: getStatus(response.data.quantity) }, ...current])
        showToast('Médicament ajouté avec succès.', 'success')
      }
      setIsFormOpen(false)
      setEditingMedicine(null)
      return true
    } catch (requestError) {
      if (requestError.status === 401) onUnauthorized()
      else showToast(requestError.message || 'Impossible d’enregistrer le médicament.', 'error')
      return false
    }
  }

  function requestDelete() {
    setMedicinePendingDeletion(selectedMedicine)
    setSelectedMedicine(null)
  }

  async function handleDelete() {
    if (!medicinePendingDeletion) return
    setDeleting(true)
    try {
      await deleteMedicine(medicinePendingDeletion._id)
      setMedicineList((current) => current.filter((medicine) => medicine._id !== medicinePendingDeletion._id))
      setMedicinePendingDeletion(null)
      showToast('Médicament supprimé avec succès.', 'success')
    } catch (requestError) {
      if (requestError.status === 401) onUnauthorized()
      else showToast(requestError.message || 'Impossible de supprimer le médicament.', 'error')
    } finally {
      setDeleting(false)
    }
  }

  const filteredMedicines = useMemo(() => medicineList.filter((medicine) => medicine.name.toLowerCase().includes(query.toLowerCase())), [medicineList, query])
  const lowStockCount = medicineList.filter((medicine) => medicine.quantity > 0 && medicine.quantity <= 10).length
  const forms = [...new Set(medicineList.map((medicine) => medicine.pharmaceuticalForm).filter(Boolean))]

  return (
    <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
      <PageHeader eyebrow="Inventaire" title="Médicaments" description="Gérez les médicaments disponibles à la vente et suivez leurs niveaux de stock." action={<button type="button" onClick={() => { setEditingMedicine(null); setIsFormOpen(true) }} className="h-11 rounded-xl bg-[#0b83a8] px-4 text-sm font-bold text-white shadow-lg shadow-sky-600/15 transition hover:-translate-y-0.5 hover:bg-[#086e91]">+ Ajouter un médicament</button>} />

      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200/70"><p className="text-sm font-medium text-slate-500">Médicaments répertoriés</p><p className="mt-2 text-3xl font-bold text-slate-900">{medicineList.length}</p></div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200/70"><p className="text-sm font-medium text-slate-500">Formes pharmaceutiques</p><p className="mt-2 text-3xl font-bold text-slate-900">{forms.length}</p></div>
        <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100"><p className="text-sm font-medium text-amber-800">Produits à surveiller</p><p className="mt-2 text-3xl font-bold text-amber-900">{lowStockCount}</p></div>
      </section>

      <section className="mt-7 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><label className="relative block md:w-80"><span className="sr-only">Rechercher un médicament</span><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" placeholder="Rechercher dans l’inventaire" /></label><button type="button" onClick={() => { setLoading(true); loadMedicines() }} className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Actualiser</button></div>
        {loading ? <p className="py-12 text-center text-sm text-slate-500">Chargement des médicaments…</p> : filteredMedicines.length === 0 ? <p className="py-12 text-center text-sm text-slate-500">Aucun médicament ne correspond à votre recherche.</p> : <div className="mt-5"><MedicineTable medicines={filteredMedicines} onViewDetails={setSelectedMedicine} /></div>}
        <footer className="pt-5 text-sm text-slate-500">{loading ? '' : `${filteredMedicines.length} résultat${filteredMedicines.length > 1 ? 's' : ''} affiché${filteredMedicines.length > 1 ? 's' : ''}`}</footer>
      </section>
      {isFormOpen && <MedicineFormModal medicine={editingMedicine} onClose={() => { setIsFormOpen(false); setEditingMedicine(null) }} onSave={handleSave} />}
      {selectedMedicine && <MedicineDetailsModal medicine={selectedMedicine} deleting={deleting} onClose={() => setSelectedMedicine(null)} onDelete={requestDelete} onEdit={() => { setEditingMedicine(selectedMedicine); setSelectedMedicine(null); setIsFormOpen(true) }} />}
      {medicinePendingDeletion && <ConfirmModal title="Supprimer ce médicament ?" message={`Êtes-vous sûr de vouloir supprimer « ${medicinePendingDeletion.name} » ?`} confirmLabel="Oui, supprimer" loading={deleting} onCancel={() => setMedicinePendingDeletion(null)} onConfirm={handleDelete} />}
    </div>
  )
}

export default MedicinesPage
