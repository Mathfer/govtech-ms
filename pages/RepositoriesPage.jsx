import { useState } from 'react'
import {
  Folder,
  GitBranch,
  GitPullRequest,
} from 'lucide-react'

import BranchesList from '../components/repositories/BranchesList'
import PullRequestsList from '../components/repositories/PullRequestsList'
import RepositoriesList from '../components/repositories/RepositoriesList'

export default function RepositoriesPage() {
  const [tab, setTab] = useState('repositorios')

  return (
    <main className="dashboard-content">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">MONITORAMENTO DE DESENVOLVIMENTO</span>

          <h2>
            Repositórios<span className="title-dot">.</span>
          </h2>

          <p>
            Acompanhe repositórios, Pull Requests e branches para apoiar a
            governança dos projetos.
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
            <button
              className={tab === 'repositorios' ? 'active' : ''}
              onClick={() => setTab('repositorios')}
            >
              <Folder size={16} />
              Repositórios
            </button>

            <button
              className={tab === 'pull-requests' ? 'active' : ''}
              onClick={() => setTab('pull-requests')}
            >
              <GitPullRequest size={16} />
              Pull Requests
            </button>

            <button
              className={tab === 'branches' ? 'active' : ''}
              onClick={() => setTab('branches')}
            >
              <GitBranch size={16} />
              Branches
            </button>
          </div>
        </div>
      </section>

      {tab === 'repositorios' && <RepositoriesList />}
      {tab === 'pull-requests' && <PullRequestsList />}
      {tab === 'branches' && <BranchesList />}
    </main>
  )
}