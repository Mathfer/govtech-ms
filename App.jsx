import { useState, useEffect } from 'react'

import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import GlobalSearch from './components/layout/GlobalSearch'

import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'

import { defaultSettings } from './constants/defaultSettings'
import { useLocalStorage } from './hooks/useLocalStorage'
import { storageKeys } from './constants/storageKeys'

import './tokens.css'
import './index.css'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Visão geral')
  const [settings, setSettings] = useLocalStorage(
    storageKeys.SETTINGS,
    defaultSettings
  )

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname)

  // Detecta mudança de rota
  useEffect(() => {
    const handleLocation = () => {
      setCurrentRoute(window.location.pathname)
    }
    
    window.addEventListener('popstate', handleLocation)
    handleLocation()
    
    return () => window.removeEventListener('popstate', handleLocation)
  }, [])

  // Rota de login (raiz e /login)
  if (currentRoute === '/' || currentRoute === '/login' || currentRoute === '') {
    return <LoginPage />
  }

  // Rota da landing page
  if (currentRoute === '/landing') {
    return <LandingPage />
  }

  // Dashboard e outras rotas
  return (
    <div className="app-layout">
      <Sidebar
        active={activeSection}
        setActive={setActiveSection}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        settings={settings}
        setSettings={setSettings}
      />

      <div className="main-content">
        

        <GlobalSearch />

        <DashboardPage
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          settings={settings}
          setSettings={setSettings}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
    </div>
  )
}