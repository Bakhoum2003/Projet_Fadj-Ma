function AuthTabs({ activeTab, onChange }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">Espace sécurisé</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {activeTab === 'login' ? 'Heureux de vous revoir.' : 'Créez votre espace Fadj-Ma.'}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        {activeTab === 'login'
          ? 'Connectez-vous pour accéder à votre espace pharmacie.'
          : 'Renseignez vos informations pour démarrer simplement.'}
      </p>

      <div className="mt-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Authentification">
        <button
          className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${activeTab === 'login' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 'login'}
          onClick={() => onChange('login')}
        >
          Connectez-vous
        </button>
        <button
          className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${activeTab === 'register' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 'register'}
          onClick={() => onChange('register')}
        >
          Inscrivez-vous
        </button>
      </div>
    </div>
  )
}

export default AuthTabs
