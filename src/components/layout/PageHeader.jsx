function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="flex flex-col gap-5 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">{eyebrow}</p>}
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {action}
    </header>
  )
}

export default PageHeader
