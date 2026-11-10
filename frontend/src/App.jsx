import { useCallback, useState } from 'react'
import AuthLayout from './features/auth/components/AuthLayout.jsx'
import AuthTabs from './features/auth/components/AuthTabs.jsx'
import LoginForm from './features/auth/components/LoginForm.jsx'
import RegisterForm from './features/auth/components/RegisterForm.jsx'
import AppShell from './components/layout/AppShell.jsx'
import DashboardPage from './features/dashboard/DashboardPage.jsx'
import MedicinesPage from './features/medicines/MedicinesPage.jsx'
import { getStoredSession } from './services/api.js'
import { logoutUser } from './services/authService.js'
import ConfirmModal from './components/ui/ConfirmModal.jsx'
import { useToast } from './components/ui/useToast.js'

function App() {
  const [activeTab, setActiveTab] = useState('login')
  const [session, setSession] = useState(getStoredSession)
  const [currentPage, setCurrentPage] = useState(session ? 'dashboard' : 'login')
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)
  const showToast = useToast()

  const handleLogin = useCallback((user) => {
    setSession(getStoredSession() || { user })
    setCurrentPage('dashboard')
    showToast(`Bienvenue, ${user.firstName || user.lastName || 'utilisateur'} !`, 'success')
  }, [showToast])

  const confirmLogout = useCallback(() => {
    logoutUser()
    setSession(null)
    setCurrentPage('login')
    setActiveTab('login')
    setIsLogoutConfirmOpen(false)
    showToast('Vous êtes maintenant déconnecté.', 'info')
  }, [showToast])

  const requestLogout = useCallback(() => setIsLogoutConfirmOpen(true), [])

  const handleUnauthorized = useCallback(() => {
    logoutUser()
    setSession(null)
    setCurrentPage('login')
    setActiveTab('login')
    showToast('Votre session a expiré. Connectez-vous de nouveau.', 'warning')
  }, [showToast])

  if (!session || currentPage === 'login') {
    return (
      <AuthLayout>
        <AuthTabs activeTab={activeTab} onChange={setActiveTab} />
         {activeTab === 'login' ? <LoginForm onLogin={handleLogin} /> : <RegisterForm />}
      </AuthLayout>
    )
  }

  return (
    <AppShell currentPage={currentPage} onNavigate={setCurrentPage} onLogout={requestLogout}>
      {currentPage === 'dashboard' ? <DashboardPage onNavigate={setCurrentPage} onUnauthorized={handleUnauthorized} /> : <MedicinesPage onUnauthorized={handleUnauthorized} />}
      {isLogoutConfirmOpen && <ConfirmModal title="Confirmer la déconnexion ?" message="Êtes-vous sûr de vouloir vous déconnecter ?" confirmLabel="Oui, me déconnecter" onCancel={() => setIsLogoutConfirmOpen(false)} onConfirm={confirmLogout} />}
    </AppShell>
  )
}

export default App
