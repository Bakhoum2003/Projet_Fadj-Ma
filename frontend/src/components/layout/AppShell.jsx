import Sidebar from './Sidebar.jsx'

function AppShell({ children, currentPage, onNavigate, onLogout }) {
  return (
    <div className="min-h-screen bg-[#f4f8fb] pt-16 text-slate-900 lg:pl-72 lg:pt-0">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="min-w-0">{children}</main>
    </div>
  )
}

export default AppShell
