import Logo from '../../features/auth/components/Logo.jsx'

const navigation = [
  { id: 'dashboard', label: 'Tableau de bord', icon: '▦' },
  { id: 'medicines', label: 'Médicaments', icon: '▣' },
]

function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="shrink-0 bg-[#12365a] text-white lg:flex lg:min-h-screen lg:w-72 lg:flex-col">
      <div className="border-b border-white/10 px-5 py-5 lg:px-7 lg:py-7">
        <Logo light />
      </div>

      <nav className="flex gap-2 overflow-x-auto px-3 py-4 lg:block lg:px-4" aria-label="Navigation principale">
        {navigation.map((item) => {
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition lg:mb-2 lg:w-full ${isActive ? 'bg-cyan-400/15 text-white ring-1 ring-cyan-200/20' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'}`}
            >
              <span className={`grid size-6 place-items-center rounded-md text-base ${isActive ? 'bg-cyan-300 text-[#12365a]' : 'bg-white/10 text-blue-100'}`} aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="hidden border-t border-white/10 p-5 lg:mt-auto lg:block">
        <div className="rounded-2xl bg-white/[0.07] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">Fadj-Ma</p>
          <p className="mt-2 text-sm leading-5 text-blue-100/75">La gestion de votre pharmacie, en toute simplicité.</p>
        </div>
        <button type="button" onClick={() => onNavigate('login')} className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-100/80 transition hover:text-white">
          <span aria-hidden="true">←</span> Déconnexion
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
