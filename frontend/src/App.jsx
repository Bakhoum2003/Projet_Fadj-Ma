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

function App() {
  const [activeTab, setActiveTab] = useState('login')
  const [session, setSession] = useState(getStoredSession)
  const [currentPage, setCurrentPage] = useState(session ? 'dashboard' : 'login')

  const handleLogin = useCallback((user) => {
    setSession(getStoredSession() || { user })
    setCurrentPage('dashboard')
  }, [])

  const handleLogout = useCallback(() => {
    logoutUser()
    setSession(null)
    setCurrentPage('login')
    setActiveTab('login')
  }, [])

  const handleUnauthorized = useCallback(() => {
    handleLogout()
  }, [handleLogout])

  if (!session || currentPage === 'login') {
    return (
      <AuthLayout>
        <AuthTabs activeTab={activeTab} onChange={setActiveTab} />
         {activeTab === 'login' ? <LoginForm onLogin={handleLogin} /> : <RegisterForm />}
      </AuthLayout>
    )
  }

  return (
    <AppShell currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout}>
      {currentPage === 'dashboard' ? <DashboardPage onNavigate={setCurrentPage} onUnauthorized={handleUnauthorized} /> : <MedicinesPage onUnauthorized={handleUnauthorized} />}
    </AppShell>
  )
}

export default App
