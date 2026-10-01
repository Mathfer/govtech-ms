import { useState } from 'react'
import { AlertTriangle, LockKeyhole, Search, Download } from 'lucide-react'

import { auditEvents } from '../data/mockData'
import Icon from '../components/common/Icon'

export default function AuditPage() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = auditEvents.filter((event) => {
    const text =
      `${event.action} ${event.service} ${event.actor}`.toLowerCase()

    return (
      text.includes(searchTerm.toLowerCase()) &&
      (filter === 'all' || event.status === filter)
    )
  })

  const exportAuditData = () => {
    // Exporta TODOS os eventos de auditoria (não apenas projetos)
    const auditData = auditEvents.map(event => ({
      data_hora: event.time,
      acao: event.action,
      servico: event.service,
      usuario: event.actor,
      status: event.status,
      hash: event.hash
    }));

    // Converte para CSV
    const headers = Object.keys(auditData[0]);
    const csv = [
      headers.join(','),
      ...auditData.map(row =>
        headers.map(header =>
          `"${String(row[header]).replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Cria e baixa o arquivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `auditoria-eventos-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="dashboard-content">
      {/* Topo com título e botão de exportar */}
      <div className="dashboard-intro" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <div>
          <span className="eyebrow">TRILHA DE AUDITORIA IMUTÁVEL</span>

          <h2>
            Auditoria de Eventos<span className="title-dot">.</span>
          </h2>

          <p>
            Registro de eventos críticos de Pull Requests, pipelines, acessos e
            aprovações.
          </p>
        </div>

        {/* Botão Exportar alinhado à direita */}
        <button
          onClick={exportAuditData}
          className="primary-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-end',
            marginBottom: '8px'
          }}
        >
          <Download size={18} />
          Exportar Dados
        </button>
      </div>

      {/* Filtros de auditoria */}
      <section className="panel elevation-1" style={{ marginBottom: '24px' }}>
        <div className="panel-heading">
          <h3>Filtros de auditoria</h3>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div className="input-wrap" style={{ flex: 1, minWidth: '230px' }}>
            <Search size={17} />

            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por ação, serviço ou usuário..."
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['all', 'success', 'warning', 'danger', 'info'].map((status) => (
              <button
                key={status}
                className={
                  filter === status
                    ? 'primary-button small'
                    : 'secondary-button small'
                }
                onClick={() => setFilter(status)}
              >
                {status === 'all' && 'Todos'}
                {status === 'success' && 'Sucessos'}
                {status === 'warning' && 'Atenção'}
                {status === 'danger' && 'Erros'}
                {status === 'info' && 'Informações'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de eventos */}
      <section className="panel audit-panel elevation-1">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">
              {filteredEvents.length} EVENTOS ENCONTRADOS
            </span>

            <h2>Eventos de auditoria</h2>
          </div>
        </div>

        <div className="audit-list">
          {filteredEvents.length === 0 ? (
            <div
              style={{
                padding: '45px',
                color: 'var(--muted)',
                textAlign: 'center',
              }}
            >
              <LockKeyhole size={35} style={{ opacity: 0.35 }} />
              <p>Nenhum evento encontrado.</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div className="audit-item" key={event.hash}>
                <div className={`audit-icon audit-${event.status}`}>
                  <Icon
                    name={
                      event.status === 'success'
                        ? 'Check'
                        : event.status === 'danger'
                          ? 'AlertTriangle'
                          : 'LockKeyhole'
                    }
                    size={15}
                  />
                </div>

                <div className="audit-main">
                  <b>{event.action}</b>

                  <span>
                    {event.service} <i>·</i> {event.actor}
                  </span>

                  <code>{event.hash}</code>
                </div>

                <time>{event.time}</time>
              </div>
            ))
          )}
        </div>
      </section>
    </main >
  )
}