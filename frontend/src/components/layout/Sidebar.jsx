import { useEffect, useState } from 'react'
import Logo from '../../features/auth/components/Logo.jsx'

const navigation = [
  { id: 'dashboard', label: 'Tableau de bord', icon: '▦' },
  { id: 'medicines', label: 'Médicaments', icon: '▣' },
]

function Sidebar({ currentPage, onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  function navigate(page) {
    onNavigate(page)
    setIsOpen(false)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-[#12365a] px-4 text-white shadow-lg shadow-slate-950/10 lg:hidden">
        <Logo light />
        <button type="button" onClick={() => setIsOpen(true)} className="grid size-11 place-items-center rounded-xl bg-white/10 text-xl transition hover:bg-white/15" aria-label="Ouvrir le menu" aria-expanded={isOpen}>☰</button>
      </header>
      {isOpen && <button type="button" className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden" onClick={() => setIsOpen(false)} aria-label="Fermer le menu" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[86vw] flex-col bg-[#12365a] text-white shadow-2xl shadow-slate-950/25 transition-transform duration-300 lg:z-30 lg:w-72 lg:max-w-none lg:translate-x-0 lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="border-b border-white/10 px-5 py-5 lg:px-7 lg:py-7">
        <div className="flex items-center justify-between gap-3"><Logo light /><button type="button" onClick={() => setIsOpen(false)} className="grid size-10 place-items-center rounded-xl text-xl text-blue-100 transition hover:bg-white/10 lg:hidden" aria-label="Fermer le menu">×</button></div>
      </div>

      <nav className="space-y-2 px-3 py-4 lg:px-4" aria-label="Navigation principale">
        {navigation.map((item) => {
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-cyan-400/15 text-white ring-1 ring-cyan-200/20' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'}`}
            >
              <span className={`grid size-6 place-items-center rounded-md text-base ${isActive ? 'bg-cyan-300 text-[#12365a]' : 'bg-white/10 text-blue-100'}`} aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 p-5">
        <div className="rounded-2xl bg-white/[0.07] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">Fadj-Ma</p>
          <p className="mt-2 text-sm leading-5 text-blue-100/75">La gestion de votre pharmacie, en toute simplicité.</p>
        </div>
        <button type="button" onClick={() => { setIsOpen(false); onLogout() }} className="mt-5 flex min-h-11 w-full items-center gap-2 rounded-xl px-2 text-sm font-semibold text-blue-100/80 transition hover:bg-white/10 hover:text-white">
          <span aria-hidden="true">←</span> Déconnexion
        </button>
      </div>
      </aside>
    </>
  )
}

export default Sidebar
