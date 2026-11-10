import { useState } from 'react'
import AuthLayout from './features/auth/components/AuthLayout.jsx'
import AuthTabs from './features/auth/components/AuthTabs.jsx'
import LoginForm from './features/auth/components/LoginForm.jsx'
import RegisterForm from './features/auth/components/RegisterForm.jsx'
import AppShell from './components/layout/AppShell.jsx'
import DashboardPage from './features/dashboard/DashboardPage.jsx'
import MedicinesPage from './features/medicines/MedicinesPage.jsx'

function App() {
  const [activeTab, setActiveTab] = useState('login')
  const [currentPage, setCurrentPage] = useState('login')

  if (currentPage === 'login') {
    return (
      <AuthLayout>
        <AuthTabs activeTab={activeTab} onChange={setActiveTab} />
         {activeTab === 'login' ? <LoginForm onLogin={() => setCurrentPage('dashboard')} /> : <RegisterForm />}
      </AuthLayout>
    )
  }

  return (
    <AppShell currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' ? <DashboardPage onNavigate={setCurrentPage} /> : <MedicinesPage />}
    </AppShell>
  )
}

export default App
