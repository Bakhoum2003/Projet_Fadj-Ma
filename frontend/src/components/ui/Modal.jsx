import { useEffect, useRef } from 'react'

function Modal({ children, onClose, labelledBy, size = 'max-w-4xl' }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    dialogRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <section ref={dialogRef} tabIndex="-1" className={`relative max-h-[92vh] w-full overflow-y-auto rounded-t-[1.75rem] bg-white shadow-2xl shadow-slate-950/25 outline-none sm:max-h-[90vh] sm:rounded-[1.75rem] ${size}`} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        {children}
      </section>
    </div>
  )
}

export default Modal
