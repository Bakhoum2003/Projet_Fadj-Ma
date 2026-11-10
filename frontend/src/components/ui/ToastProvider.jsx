import { useCallback, useState } from 'react'
import { ToastContext } from './useToast.js'

const toastStyles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-sky-200 bg-sky-50 text-sky-800',
}

const toastIcons = { success: '✓', error: '!', warning: '!', info: 'i' }

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((current) => [...current, { id, message, type }])
    window.setTimeout(() => dismissToast(id), 4500)
  }, [dismissToast])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="pointer-events-none fixed inset-x-3 top-3 z-[70] flex max-w-sm flex-col gap-3 sm:left-auto sm:right-5 sm:top-5" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => <div key={toast.id} role="status" className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl shadow-slate-950/10 ${toastStyles[toast.type] || toastStyles.info}`}>
          <span className="grid size-5 shrink-0 place-items-center rounded-full border border-current text-xs" aria-hidden="true">{toastIcons[toast.type] || toastIcons.info}</span>
          <p className="min-w-0 flex-1 leading-5">{toast.message}</p>
          <button type="button" onClick={() => dismissToast(toast.id)} className="-mr-1 -mt-1 grid size-7 shrink-0 place-items-center rounded-lg text-base opacity-70 transition hover:bg-black/5 hover:opacity-100" aria-label="Fermer la notification">×</button>
        </div>)}
      </div>
    </ToastContext.Provider>
  )
}

