import Modal from './Modal.jsx'

function ConfirmModal({ title, message, confirmLabel, onCancel, onConfirm, loading = false }) {
  return (
    <Modal onClose={onCancel} labelledBy="confirm-modal-title" size="max-w-md">
      <div className="p-6 sm:p-7">
        <h2 id="confirm-modal-title" className="pr-8 text-xl font-bold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" disabled={loading} onClick={onCancel} className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60">Annuler</button>
          <button type="button" disabled={loading} onClick={onConfirm} className="h-11 rounded-xl bg-[#0b83a8] px-5 text-sm font-bold text-white transition hover:bg-[#086e91] disabled:opacity-60">{loading ? 'Traitement…' : confirmLabel}</button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
