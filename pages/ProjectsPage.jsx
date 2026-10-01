import { CalendarClock, CircleAlert, FolderKanban, Plus, Users } from 'lucide-react'

const projects = [
  {
    name: 'Plataforma GovTech MS',
    owner: 'Marina Costa',
    deadline: '18 out. 2026',
    progress: 78,
    health: 'Saudável',
    status: 'success',
  },
  {
    name: 'Portal de Indicadores',
    owner: 'Lucas Ferreira',
    deadline: '04 nov. 2026',
    progress: 56,
    health: 'Atenção',
    status: 'warning',
  },
  {
    name: 'Integração GitHub Actions',
    owner: 'Rafael Mendes',
    deadline: '12 out. 2026',
    progress: 42,
    health: 'Risco',
    status: 'danger',
  },
]

export default function ProjectsPage() {
  return (
    <section className="dashboard-content">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">PORTFÓLIO E ACOMPANHAMENTO</span>

          <p>
            Acompanhe prazos, responsáveis, progresso e sinais de risco dos
            projetos monitorados pela plataforma.
          </p>
        </div>

        <button type="button" className="primary-button">
          <Plus size={16} />
          Novo projeto
        </button>
      </div>

      <div className="dashboard-grid three-columns">
        <article className="metric-card elevation-1">
          <span>Projetos ativos</span>
          <strong>12</strong>
          <small>Em acompanhamento</small>
        </article>

        <article className="metric-card elevation-1">
          <span>Em atenção</span>
          <strong>3</strong>
          <small>Exigem acompanhamento</small>
        </article>

        <article className="metric-card elevation-1">
          <span>Riscos críticos</span>
          <strong>1</strong>
          <small>Impacto potencial em prazo</small>
        </article>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card elevation-1" key={project.name}>
            <div className="project-card-top">
              <div className="project-icon">
                <FolderKanban size={19} />
              </div>

              <span className={`status-badge ${project.status}`}>
                {project.health}
              </span>
            </div>

            <h3>{project.name}</h3>

            <div className="project-meta">
              <span>
                <Users size={15} />
                {project.owner}
              </span>

              <span>
                <CalendarClock size={15} />
                {project.deadline}
              </span>
            </div>

            <div className="project-progress">
              <div>
                <span>Progresso</span>
                <strong>{project.progress}%</strong>
              </div>

              <div className="progress-track">
                <span style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            {project.status === 'danger' && (
              <div className="project-alert">
                <CircleAlert size={15} />
                Dependências pendentes podem afetar o prazo.
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}