function Logo({ light = false }) {
  return (
    <div className="inline-flex items-center gap-3" aria-label="Fadj-Ma">
      <span
        className="grid size-11 place-items-center rounded-2xl bg-white/15 shadow-lg shadow-slate-950/10 ring-1 ring-white/25"
        aria-hidden="true"
      >
        <svg className="size-7" viewBox="0 0 32 32" fill="none">
          <path d="M4.5 6.5h3l2.2 12.2h13.4l2.2-8.6H10" stroke="#F8D44B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22.8 4v5.6M20 6.8h5.6" stroke="#5ED6E6" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="12.2" cy="24" r="1.8" fill="#F8D44B" />
          <circle cx="22" cy="24" r="1.8" fill="#F8D44B" />
        </svg>
      </span>
      <span className={light ? 'text-white' : 'text-slate-900'}>
        <span className="block text-lg font-bold tracking-tight">Fadj-Ma</span>
        <span className="block text-xs font-medium opacity-70">Votre pharmacie, simplifiée</span>
      </span>
    </div>
  )
}

export default Logo
