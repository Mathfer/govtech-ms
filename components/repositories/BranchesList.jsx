import { useState } from 'react'
import { GitBranch } from 'lucide-react'

import { branches, services } from '../../data/mockData'
import StatusBadge from '../common/StatusBadge'
import BranchStat from './BranchStat'

export default function BranchesList() {
  const [filterRepo, setFilterRepo] = useState('all')

  const filteredBranches =
    filterRepo === 'all'
      ? branches
      : branches.filter((branch) => branch.repository === filterRepo)

  const branchStats = {
    total: filteredBranches.length,
    active: filteredBranches.filter((branch) => branch.status === 'active')
      .length,
    stale: filteredBranches.filter((branch) => branch.status === 'stale')
      .length,
  }

  return (
    <section className="panel elevation-1">
      <div className="panel-heading">
        <div>
          <span className="section-kicker">
            {filterRepo === 'all'
              ? 'TODOS OS REPOSITÓRIOS'
              : filterRepo.toUpperCase()}
          </span>

          <h2>Branches por Repositório</h2>
        </div>

        <select
          value={filterRepo}
          onChange={(event) => setFilterRepo(event.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid var(--border)',
            borderRadius: '7px',
            background: 'var(--surface)',
            color: 'inherit',
          }}
        >
          <option value="all">Todos os repositórios</option>

          {services.map((service) => (
            <option key={service.name} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <BranchStat label="TOTAL" value={branchStats.total} />

        <BranchStat
          label="ATIVAS"
          value={branchStats.active}
          color="var(--color-success)"
        />

        <BranchStat
          label="ABANDONADAS"
          value={branchStats.stale}
          color="var(--color-warning)"
        />
      </div>

      {filterRepo !== 'all' && (
        <div
          style={{
            marginBottom: '16px',
            padding: '10px 12px',
            borderRadius: '8px',
            background: 'var(--color-primary-50)',
            color: 'var(--color-primary-700)',
            fontSize: '13px',
          }}
        >
          Exibindo <strong>{branchStats.total}</strong> branch(es) do
          repositório <strong>{filterRepo}</strong>.
        </div>
      )}

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>BRANCH</th>
              <th>REPOSITÓRIO</th>
              <th>ÚLTIMO COMMIT</th>
              <th>COMMITS</th>
              <th>AUTOR</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {filteredBranches.map((branch) => (
              <tr key={`${branch.repository}-${branch.name}`}>
                <td>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                    }}
                  >
                    <GitBranch size={16} />
                    {branch.name}
                  </span>
                </td>

                <td>{branch.repository}</td>
                <td>{branch.lastCommit}</td>
                <td>{branch.commits}</td>
                <td>{branch.author}</td>

                <td>
                  <StatusBadge
                    status={branch.status === 'active' ? 'success' : 'warning'}
                  >
                    {branch.status === 'active' ? 'Ativa' : 'Abandonada'}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBranches.length === 0 && (
        <div
          style={{
            padding: '32px',
            color: 'var(--muted)',
            textAlign: 'center',
          }}
        >
          Nenhuma branch encontrada para este repositório.
        </div>
      )}
    </section>
  )
}