import { createContext, useContext } from 'react'

export const ToastContext = createContext(null)

export function useToast() {
  const showToast = useContext(ToastContext)
  if (!showToast) throw new Error('useToast doit être utilisé dans ToastProvider.')
  return showToast
}
