import { useEffect, useState } from 'react'
import {
  Bell,
  BriefcaseBusiness,
  Check,
  Code2,
  Eye,
  GitFork,
  LockKeyhole,
  Settings2,
  Shield,
  Sparkles,
  Target,
  TimerReset,
} from 'lucide-react'

import StatusBadge from '../components/common/StatusBadge'

export default function SettingsPage({
  settings,
  onSaveSettings,
  onToast,
}) {
  const [tab, setTab] = useState('geral')

  const [draft, setDraft] = useState({
    organizationName: settings.organizationName,
    timezone: settings.timezone,
    theme: settings.theme,
    notifications: {
      ...settings.notifications,
    },
  })

  useEffect(() => {
    setDraft({
      organizationName: settings.organizationName,
      timezone: settings.timezone,
      theme: settings.theme,
      notifications: {
        ...settings.notifications,
      },
    })
  }, [settings])

  const save = () => {
    onSaveSettings(draft)
    onToast('Configurações salvas com sucesso.')
  }

  const toggleNotification = (key) => {
    setDraft((current) => ({
      ...current,
      notifications: {
        ...current.notifications,
        [key]: !current.notifications[key],
      },
    }))
  }

  const tabs = [
    { id: 'geral', label: 'Geral', icon: Settings2 },
    { id: 'integracoes', label: 'Integrações', icon: GitFork },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
  ]

  return (
    <main className="dashboard-content">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">ADMINISTRAÇÃO DO SISTEMA</span>

          <h2>
            Configurações<span className="title-dot">.</span>
          </h2>

          <p>
            Personalize a plataforma, integre ferramentas e gerencie
            preferências.
          </p>
        </div>
      </div>

      <section className="panel elevation-1" style={{ marginBottom: '24px' }}>
        <div
          className="section-tabs"
          style={{
            borderBottom: 'none',
            padding: '0 16px',
          }}
        >
          <div>
            {tabs.map((item) => {
              const TabIcon = item.icon

              return (
                <button
                  key={item.id}
                  className={tab === item.id ? 'active' : ''}
                  onClick={() => setTab(item.id)}
                >
                  <TabIcon size={16} />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {tab === 'geral' && (
        <section className="panel elevation-1">
          <div className="panel-heading">
            <h2>Configurações Gerais</h2>
          </div>

          <div
            style={{
              display: 'grid',
              maxWidth: '620px',
              gap: '22px',
            }}
          >
            <label>
              <strong
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontSize: '13px',
                }}
              >
                Nome da organização
              </strong>

              <div className="input-wrap">
                <BriefcaseBusiness size={17} />

                <input
                  value={draft.organizationName}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      organizationName: event.target.value,
                    })
                  }
                />
              </div>
            </label>

            <label>
              <strong
                style={{
                  display: 'block',
                  marginBottom: '7px',
                  fontSize: '13px',
                }}
              >
                Fuso horário
              </strong>

              <div className="input-wrap">
                <TimerReset size={17} />

                <select
                  value={draft.timezone}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      timezone: event.target.value,
                    })
                  }
                  style={{
                    flex: 1,
                    border: 0,
                    outline: 0,
                    background: 'transparent',
                  }}
                >
                  <option value="America/Sao_Paulo">
                    Brasília (UTC-3)
                  </option>
                  <option value="America/New_York">
                    New York (UTC-5)
                  </option>
                  <option value="Europe/London">
                    London (UTC+0)
                  </option>
                </select>
              </div>
            </label>

            <div>
              <strong
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontSize: '13px',
                }}
              >
                Tema
              </strong>

              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  ['Claro', Sparkles],
                  ['Escuro', Eye],
                  ['Sistema', Settings2],
                ].map(([theme, ThemeIcon]) => (
                  <button
                    key={theme}
                    className={
                      draft.theme === theme
                        ? 'primary-button small'
                        : 'secondary-button small'
                    }
                    onClick={() =>
                      setDraft({
                        ...draft,
                        theme,
                      })
                    }
                  >
                    <ThemeIcon size={14} />
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <button className="primary-button" onClick={save}>
              <Check size={16} />
              Salvar alterações
            </button>
          </div>
        </section>
      )}

      {tab === 'integracoes' && (
        <section className="panel elevation-1">
          <div className="panel-heading">
            <h2>Integrações</h2>
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              ['GitHub', 'Sincronização de repositórios, PRs e commits.', GitFork, true],
              ['SonarQube', 'Análise de qualidade de código.', Code2, true],
              ['Slack', 'Notificações e alertas.', Bell, false],
              ['Jira', 'Issues, tarefas e sprints.', Target, false],
            ].map(([name, description, IntegrationIcon, connected]) => (
              <article
                key={name}
                className="metric-card elevation-1"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div className="metric-icon">
                  <IntegrationIcon size={18} />
                </div>

                <div style={{ flex: 1 }}>
                  <strong>{name}</strong>

                  <small
                    style={{
                      display: 'block',
                      marginTop: '4px',
                      color: 'var(--muted)',
                    }}
                  >
                    {description}
                  </small>
                </div>

                <StatusBadge status={connected ? 'success' : 'warning'}>
                  {connected ? 'Conectado' : 'Desconectado'}
                </StatusBadge>

                <button
                  className="secondary-button small"
                  onClick={() => onToast(`${name}: ação demonstrativa.`)}
                >
                  {connected ? 'Configurar' : 'Conectar'}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === 'notificacoes' && (
        <section className="panel elevation-1">
          <div className="panel-heading">
            <h2>Notificações</h2>
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              ['deploy', 'Alertas de deploy', 'Receba aviso quando um deploy for concluído.'],
              ['critical', 'Erros críticos', 'Alertas imediatos de falhas e pipelines.'],
              ['security', 'Atualizações de segurança', 'Avisos de riscos e vulnerabilidades.'],
              ['weekly', 'Resumo semanal', 'Relatório semanal de projetos e KPIs.'],
            ].map(([key, label, description]) => {
              const enabled = draft.notifications[key]

              return (
                <article
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '15px 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <strong
                      style={{
                        display: 'block',
                        fontSize: '14px',
                      }}
                    >
                      {label}
                    </strong>

                    <small style={{ color: 'var(--muted)' }}>
                      {description}
                    </small>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleNotification(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: enabled ? 'flex-end' : 'flex-start',
                      width: '44px',
                      height: '24px',
                      padding: '3px',
                      border: 0,
                      borderRadius: '20px',
                      background: enabled
                        ? 'var(--color-primary-500)'
                        : 'var(--border)',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#fff',
                      }}
                    />
                  </button>
                </article>
              )
            })}
          </div>

          <button
            className="primary-button"
            style={{ marginTop: '20px' }}
            onClick={save}
          >
            <Check size={16} />
            Salvar preferências
          </button>
        </section>
      )}

      {tab === 'seguranca' && (
        <section className="panel elevation-1">
          <div className="panel-heading">
            <h2>Segurança e Autenticação</h2>
          </div>

          <div style={{ display: 'grid', gap: '14px' }}>
            {[
              ['Autenticação em dois fatores (2FA)', 'Adicione uma camada adicional de segurança.', LockKeyhole, 'Ativar'],
              ['Sessões ativas', 'Gerencie dispositivos conectados à conta.', Shield, 'Ver 2 sessões'],
              ['Alterar senha', 'Atualize sua senha periodicamente.', LockKeyhole, 'Alterar'],
            ].map(([title, description, SecurityIcon, action]) => (
              <article
                key={title}
                className="metric-card elevation-1"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div className="metric-icon">
                  <SecurityIcon size={18} />
                </div>

                <div style={{ flex: 1 }}>
                  <strong>{title}</strong>

                  <small
                    style={{
                      display: 'block',
                      marginTop: '4px',
                      color: 'var(--muted)',
                    }}
                  >
                    {description}
                  </small>
                </div>

                <button
                  className="secondary-button small"
                  onClick={() => onToast(`${action}: ação demonstrativa.`)}
                >
                  {action}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}