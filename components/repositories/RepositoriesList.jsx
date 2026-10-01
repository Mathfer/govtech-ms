import { Server } from 'lucide-react'

import { services } from '../../data/mockData'
import StatusBadge from '../common/StatusBadge'

export default function RepositoriesList() {
  return (
    <section className="panel services-panel elevation-1">
      <div className="panel-heading">
        <div>
          <span className="section-kicker">
            {services.length} REPOSITÓRIOS MONITORADOS
          </span>

          <h2>Lista de Repositórios</h2>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>REPOSITÓRIO</th>
              <th>TIME</th>
              <th>LINGUAGEM</th>
              <th>VERSÃO</th>
              <th>ATUALIZADO</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.name}>
                <td>
                  <div className="service-name">
                    <span
                      className={`service-status status-${service.deploy}`}
                    >
                      <Server size={14} />
                    </span>

                    <div>
                      <b>{service.name}</b>
                      <small>{service.language}</small>
                    </div>
                  </div>
                </td>

                <td>{service.team}</td>
                <td>{service.language}</td>
                <td className="mono">{service.version}</td>
                <td className="muted-cell">{service.updated}</td>

                <td>
                  <StatusBadge
                    status={
                      service.deploy === 'healthy'
                        ? 'success'
                        : service.deploy === 'pending'
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {service.deploy === 'healthy'
                      ? 'Ativo'
                      : service.deploy === 'pending'
                        ? 'Atenção'
                        : 'Crítico'}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}