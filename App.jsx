import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

export default function App() {
  const isDashboard = window.location.pathname.startsWith('/dashboard')

  return isDashboard ? <DashboardPage /> : <LoginPage />
}