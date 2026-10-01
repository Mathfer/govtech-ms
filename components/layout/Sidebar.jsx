import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  Sparkles,
  Users,
  Settings2,
  Check,
  X,
} from 'lucide-react'

import Brand from '../common/Brand'
import Icon from '../common/Icon'
import ChatbotModal from '../common/ChatbotModal'
import { auditEvents, profile } from '../../data/mockData'

export default function Sidebar({
  active,
  setActive,
  open,
  setOpen,
  settings,
  setSettings,
}) {
  const [showChatbot, setShowChatbot] = useState(false)
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false)

  const menuItems = [
    { label: 'Visão geral', icon: 'BarChart3' },
    { label: 'Auditoria', icon: 'LockKeyhole' },
    { label: 'Repositórios', icon: 'GitBranch' },
    { label: 'Projetos', icon: 'Target' },
  ]

  const workspaces = [
    { id: 1, name: 'govtech-platform', logo: 'G' },
    { id: 2, name: 'govtech-ms', logo: 'M' },
    { id: 3, name: 'govtech-ti', logo: 'T' },
  ]

  const navigate = (page) => {
    setActive(page)
    setOpen(false)
  }

  const handleWorkspaceSelect = (workspace) => {
    setSettings(prev => ({
      ...prev,
      organizationName: workspace.name
    }))
    setShowWorkspaceMenu(false)
  }

  return (
    <>
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-head">
          <Brand compact />

          <button
            className="icon-button sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar navegação"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        {/* Workspace Switcher */}
        <div className="workspace-switch">
          {/* Botão do Workspace - Só aparece quando menu está fechado */}
          {!showWorkspaceMenu && (
            <button
              onClick={() => setShowWorkspaceMenu(true)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 10px',
                background: 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary, #f5f5f5)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '5px',
                  backgroundColor: 'var(--color-primary-600, #0066CC)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '600',
                  flexShrink: 0
                }}
              >
                {workspaces.find(w => w.name === settings.organizationName)?.logo || 'G'}
              </span>

              <span style={{ flex: 1 }}>
                <small style={{ display: 'block', fontSize: '9px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1px', letterSpacing: '0.3px' }}>
                  WORKSPACE
                </small>
                <b style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {settings.organizationName || 'govtech-platform'}
                </b>
              </span>

              <ChevronDown size={14} style={{ color: 'var(--muted)' }} />
            </button>
          )}

          {/* Menu de Seleção - Só aparece quando aberto */}
          {showWorkspaceMenu && (
            <div>
              {/* Header com título e botão de fechar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid var(--border, #e5e7eb)',
                  paddingRight: '4px'
                }}
              >
                <span style={{
                  fontSize: '9px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  SELECIONE O WORKSPACE
                </span>

                <button
                  onClick={() => setShowWorkspaceMenu(false)}
                  style={{
                    background: 'var(--color-primary-600, #0066CC)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '5px',
                    transition: 'all 0.2s',
                    marginLeft: '4px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-700, #0052A3)'
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-600, #0066CC)'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>

              {/* Lista de workspaces */}
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => handleWorkspaceSelect(workspace)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    backgroundColor: settings.organizationName === workspace.name ? 'var(--surface, white)' : 'transparent',
                    border: '1px solid transparent',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    marginBottom: '4px'
                  }}
                  onMouseOver={(e) => {
                    if (settings.organizationName !== workspace.name) {
                      e.currentTarget.style.backgroundColor = 'var(--surface, white)'
                      e.currentTarget.style.borderColor = 'var(--border, #e5e7eb)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (settings.organizationName !== workspace.name) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.borderColor = 'transparent'
                    }
                  }}
                >
                  <span
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '5px',
                      backgroundColor: settings.organizationName === workspace.name
                        ? 'var(--color-primary-600, #0066CC)'
                        : 'var(--bg-tertiary, #e5e7eb)',
                      color: settings.organizationName === workspace.name ? 'white' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: '600',
                      flexShrink: 0
                    }}
                  >
                    {workspace.logo}
                  </span>

                  <span style={{
                    flex: 1,
                    fontWeight: settings.organizationName === workspace.name ? '600' : '500',
                    color: settings.organizationName === workspace.name ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '12px'
                  }}>
                    {workspace.name}
                  </span>

                  {settings.organizationName === workspace.name && (
                    <Check size={15} strokeWidth={2.5} color="var(--color-primary-600, #0066CC)" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="side-nav">
          <span className="nav-label">OBSERVABILIDADE</span>

          {menuItems.map((item) => (
            <button
              key={item.label}
              className={active === item.label ? 'active' : ''}
              onClick={() => navigate(item.label)}
            >
              <Icon name={item.icon} size={18} />
              {item.label}

              {item.label === 'Auditoria' && (
                <span className="nav-count">{auditEvents.length}</span>
              )}
            </button>
          ))}

          <span className="nav-label nav-label-spaced">ADMINISTRAÇÃO</span>

          <button
            className={active === 'Acessos e RBAC' ? 'active' : ''}
            onClick={() => navigate('Acessos e RBAC')}
          >
            <Users size={18} />
            Acessos e RBAC
          </button>

          <button
            className={active === 'Configurações' ? 'active' : ''}
            onClick={() => navigate('Configurações')}
          >
            <Settings2 size={18} />
            Configurações
          </button>
        </nav>

        <div className="sidebar-bottom">
          {/* Botão de Ajuda com Chatbot */}
          <button
            className="support-card"
            onClick={() => setShowChatbot(true)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Sparkles size={17} />

            <div>
              <b>Precisa de ajuda?</b>
              <span>Veja o guia de governança</span>
            </div>

            <ChevronRight size={15} />
          </button>

          <div className="profile-row">
            <span className="avatar">{profile.initials}</span>

            <span>
              <b>{profile.name}</b>
              <small>{profile.role}</small>
            </span>
          </div>
        </div>
      </aside>

      {open && (
        <button
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      {/* Modal do Chatbot */}
      {showChatbot && (
        <ChatbotModal onClose={() => setShowChatbot(false)} />
      )}
    </>
  )
}