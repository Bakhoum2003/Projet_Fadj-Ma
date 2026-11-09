import Logo from './Logo.jsx'

function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-50 p-3 text-slate-900 sm:p-5 lg:grid lg:place-items-center lg:p-8">
      <section className="mx-auto grid min-h-[calc(100vh-1.5rem)] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-sky-950/10 ring-1 ring-slate-200/80 lg:min-h-[680px] lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative overflow-hidden bg-[#12365a] px-6 py-8 text-white sm:px-10 lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-12">
          <div className="absolute -left-20 -top-24 size-72 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 size-80 rounded-full bg-blue-400/15 blur-3xl" />

          <div className="relative">
            <Logo light />
            <div className="mt-12 max-w-md lg:mt-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-cyan-100">
                <span className="size-1.5 rounded-full bg-cyan-300" />
                GESTION PHARMACEUTIQUE
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Bienvenue chez votre pharmacie.
              </h1>
              {/* <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100/80 sm:text-base">
                Retrouvez une gestion claire, fiable et sereine de votre activité au quotidien.
              </p> */}
            </div>
          </div>

          <div className="relative mt-10 hidden rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm lg:block">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-cyan-300/15 text-cyan-200">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm font-medium text-blue-50">Un espace pensé pour votre temps.</p>
            </div>
          </div>
        </aside>

        <div className="flex items-center px-5 py-9 sm:px-10 lg:px-16 lg:py-12">
          <div className="mx-auto w-full max-w-md">{children}</div>
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
