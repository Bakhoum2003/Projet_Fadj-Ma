import PageHeader from '../../components/layout/PageHeader.jsx'
import StatCard from './StatCard.jsx'
import { statistics, stockAlerts } from './dashboardData.js'

function DashboardPage({ onNavigate }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
      <PageHeader
        eyebrow="Vue d’ensemble"
        title="Tableau de bord"
        description="Bonjour Mohamed, voici un aperçu de votre pharmacie aujourd’hui."
        action={<button type="button" className="h-11 rounded-xl bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:border-sky-200 hover:text-sky-800">Télécharger le rapport</button>}
      />

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Activité de la pharmacie</h2>
              <p className="mt-1 text-sm text-slate-500">Résumé du mois de janvier 2022</p>
            </div>
            <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">+ 14,2 %</span>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 border-y border-slate-100 py-6 text-center">
            <div><p className="text-xl font-bold text-slate-900">70 856</p><p className="mt-1 text-xs text-slate-500">Unités vendues</p></div>
            <div className="border-x border-slate-100"><p className="text-xl font-bold text-slate-900">5 288</p><p className="mt-1 text-xs text-slate-500">Factures générées</p></div>
            <div><p className="text-xl font-bold text-slate-900">845</p><p className="mt-1 text-xs text-slate-500">Clients actifs</p></div>
          </div>
          <div className="mt-6 flex h-24 items-end gap-2" aria-label="Tendance des ventes">
            {[38, 54, 42, 71, 59, 84, 68, 92, 78, 100, 86, 94].map((height, index) => <span key={index} className="flex-1 rounded-t-md bg-sky-100" style={{ height: `${height}%` }} />)}
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
        <div className="flex items-center justify-between gap-4">
          <div><h2 className="text-lg font-bold text-slate-900">Alertes de stock</h2><p className="mt-1 text-sm text-slate-500">Médicaments nécessitant votre attention.</p></div>
          <button type="button" onClick={() => onNavigate('medicines')} className="text-sm font-bold text-sky-700 hover:text-sky-900">Voir tout →</button>
        </div>
        <div className="mt-5 divide-y divide-slate-100">
          {stockAlerts.map((alert) => <div className="flex items-center justify-between gap-4 py-3" key={alert.name}><div><p className="text-sm font-semibold text-slate-800">{alert.name}</p><p className="text-xs text-slate-500">{alert.category}</p></div><div className="text-right"><p className="text-sm font-bold text-slate-800">{alert.quantity} unités</p><p className={`text-xs font-semibold ${alert.status === 'En rupture' ? 'text-rose-600' : 'text-amber-600'}`}>{alert.status}</p></div></div>)}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
