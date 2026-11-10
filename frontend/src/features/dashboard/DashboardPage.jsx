import { useEffect, useState } from 'react'
import PageHeader from '../../components/layout/PageHeader.jsx'
import StatCard from './StatCard.jsx'
import { getDashboardStats } from '../../services/dashboardService.js'
import { getMedicines } from '../../services/medicineService.js'
import { useToast } from '../../components/ui/useToast.js'

function DashboardPage({ onNavigate, onUnauthorized }) {
  const [stats, setStats] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const showToast = useToast()

  useEffect(() => {
    let active = true

    async function loadDashboard() {
      setLoading(true)
      setHasError(false)
      try {
        const [statsResponse, medicinesResponse] = await Promise.all([getDashboardStats(), getMedicines()])
        if (!active) return
        const threshold = statsResponse.data.lowStockThreshold
        setStats(statsResponse.data)
        setAlerts(medicinesResponse.data.filter((medicine) => medicine.quantity <= threshold))
      } catch (requestError) {
        if (requestError.status === 401) onUnauthorized()
        else if (active) {
          setHasError(true)
          showToast(requestError.message || 'Impossible de charger le tableau de bord.', 'error')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadDashboard()
    return () => { active = false }
  }, [onUnauthorized, showToast])

  const statistics = stats ? [
    { label: 'Médicaments répertoriés', value: stats.totalMedicines, detail: 'Dans l’inventaire', tone: 'sky', symbol: '✚' },
    { label: 'Unités disponibles', value: stats.totalUnitsAvailable, detail: 'Stock cumulé', tone: 'blue', symbol: '◈' },
    { label: 'Bientôt en rupture', value: stats.lowStock, detail: `Seuil : ${stats.lowStockThreshold}`, tone: 'amber', symbol: '◷' },
    { label: 'Ruptures de stock', value: stats.outOfStock, detail: 'Action requise', tone: 'rose', symbol: '!' },
  ] : []

  return (
    <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
      <PageHeader eyebrow="Vue d’ensemble" title="Tableau de bord" description="Suivez les données réelles de votre inventaire." />

      {loading && <p className="mt-7 rounded-xl bg-white px-5 py-4 text-sm font-medium text-slate-500 ring-1 ring-slate-200/70">Chargement des statistiques…</p>}

      {!loading && !hasError && <>
        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Résumé de l’inventaire</h2>
            <p className="mt-1 text-sm text-slate-500">Les données sont calculées en temps réel depuis votre stock MongoDB.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-slate-100 py-6 text-center">
              <div><p className="text-xl font-bold text-slate-900">{stats.totalMedicines}</p><p className="mt-1 text-xs text-slate-500">Médicaments</p></div>
              <div className="border-x border-slate-100"><p className="text-xl font-bold text-slate-900">{stats.totalUnitsAvailable}</p><p className="mt-1 text-xs text-slate-500">Unités disponibles</p></div>
              <div><p className="text-xl font-bold text-slate-900">{stats.outOfStock}</p><p className="mt-1 text-xs text-slate-500">Ruptures</p></div>
            </div>
          </article>

          <article className="rounded-2xl bg-[#12365a] p-6 text-white shadow-sm">
            <span className="grid size-10 place-items-center rounded-xl bg-cyan-300/15 text-lg text-cyan-200">✚</span>
            <h2 className="mt-6 text-xl font-bold">Gérez votre inventaire</h2>
            <p className="mt-2 text-sm leading-6 text-blue-100/75">Consultez vos médicaments, suivez les niveaux de stock et anticipez les ruptures.</p>
            <button type="button" onClick={() => onNavigate('medicines')} className="mt-7 rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-bold text-[#12365a] transition hover:bg-cyan-200">Voir les médicaments</button>
          </article>
        </section>

        <section className="mt-7 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
          <div className="flex items-center justify-between gap-4"><div><h2 className="text-lg font-bold text-slate-900">Alertes de stock</h2><p className="mt-1 text-sm text-slate-500">Médicaments nécessitant votre attention.</p></div><button type="button" onClick={() => onNavigate('medicines')} className="text-sm font-bold text-sky-700 hover:text-sky-900">Voir tout →</button></div>
          <div className="mt-5 divide-y divide-slate-100">
            {alerts.length === 0 ? <p className="py-4 text-sm text-slate-500">Aucune alerte de stock pour le moment.</p> : alerts.map((medicine) => <div className="flex items-center justify-between gap-4 py-3" key={medicine._id}><div><p className="text-sm font-semibold text-slate-800">{medicine.name}</p><p className="text-xs text-slate-500">{medicine.pharmaceuticalForm || 'Forme non renseignée'}</p></div><div className="text-right"><p className="text-sm font-bold text-slate-800">{medicine.quantity} unités</p><p className={`text-xs font-semibold ${medicine.quantity === 0 ? 'text-rose-600' : 'text-amber-600'}`}>{medicine.quantity === 0 ? 'En rupture' : 'À surveiller'}</p></div></div>)}
          </div>
        </section>
      </>}
    </div>
  )
}

export default DashboardPage
