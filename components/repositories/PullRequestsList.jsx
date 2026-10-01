import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

import { pullRequests } from '../../data/mockData'
import StatusBadge from '../common/StatusBadge'
import PullRequestDetailModal from './PullRequestDetailModal'

function getStatusLabel(status) {
  const map = {
    open: ['Aberta', 'warning'],
    in_review: ['Em review', 'warning'],
    approved: ['Aprovada', 'success'],
    merged: ['Integrada', 'success'],
    closed: ['Fechada', 'default'],
  }

  return map[status] || ['Aberta', 'warning']
}

export default function PullRequestsList() {
  const [selectedPR, setSelectedPR] = useState(null)

  return (
    <>
      <section className="panel elevation-1">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">
              {pullRequests.length} PULL REQUESTS MONITORADAS
            </span>

            <h2>Pull Requests</h2>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>PR</th>
                <th>TÍTULO</th>
                <th>AUTOR</th>
                <th>REPOSITÓRIO</th>
                <th>REVIEWERS</th>
                <th>CRIADA</th>
                <th>STATUS</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {pullRequests.map((pr) => {
                const [label, badge] = getStatusLabel(pr.status)

                return (
                  <tr
                    key={pr.id}
                    onClick={() => setSelectedPR(pr)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <strong>#{pr.id}</strong>
                    </td>

                    <td>
                      <b>{pr.title}</b>

                      <small
                        style={{
                          display: 'block',
                          marginTop: '3px',
                          color: 'var(--muted)',
                        }}
                      >
                        {pr.labels.join(' · ')}
                      </small>
                    </td>

                    <td>{pr.author}</td>
                    <td>{pr.repository}</td>
                    <td>{pr.reviewers.length}</td>
                    <td>{pr.createdAt}</td>

                    <td>
                      <StatusBadge status={badge}>{label}</StatusBadge>
                    </td>

                    <td>
                      <ChevronRight size={16} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {selectedPR && (
        <PullRequestDetailModal
          pullRequest={selectedPR}
          onClose={() => setSelectedPR(null)}
        />
      )}
    </>
  )
}