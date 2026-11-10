import Sidebar from './Sidebar.jsx'

function AppShell({ children, currentPage, onNavigate, onLogout }) {
  return (
    <div className="min-h-screen bg-[#f4f8fb] text-slate-900 lg:flex">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}

export default AppShell
