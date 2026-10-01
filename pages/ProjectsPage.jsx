import { useEffect, useState } from 'react'
import { Plus, Target } from 'lucide-react'

import ProjectCard from '../components/projects/ProjectCard'
import DeleteProjectModal from '../components/projects/DeleteProjectModal'
import ProjectDetailModal from '../components/projects/ProjectDetailModal'
import ProjectFormModal from '../components/projects/ProjectFormModal'
import { normalizeProject } from '../utils/projectUtils'

export default function ProjectsPage({
  projectList = [],
  setProjectList,
  onToast,
  externalSelectedProject,
  onClearExternalSelectedProject,
}) {
  const [showForm, setShowForm] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [editingProject, setEditingProject] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const safeProjects = Array.isArray(projectList) ? projectList : []

  useEffect(() => {
    if (externalSelectedProject) {
      setSelectedProject(externalSelectedProject)
      onClearExternalSelectedProject()
    }
  }, [externalSelectedProject, onClearExternalSelectedProject])

  const openCreateForm = () => {
    setEditingProject(null)
    setShowForm(true)
  }

  const openEditForm = (project) => {
    setSelectedProject(null)
    setEditingProject(project)
    setShowForm(true)
  }

  const saveProject = (formData) => {
    if (editingProject) {
      setProjectList((current) =>
        current.map((project) =>
          project.id === editingProject.id
            ? normalizeProject({
                ...project,
                ...formData,
              })
            : project
        )
      )

      onToast('Projeto atualizado com sucesso.')
    } else {
      setProjectList((current) => [
        ...current,
        normalizeProject({
          id: Date.now(),
          ...formData,
        }),
      ])

      onToast('Projeto criado com sucesso.')
    }

    setShowForm(false)
    setEditingProject(null)
  }

  const deleteProject = () => {
    if (!selectedProject) return

    setProjectList((current) =>
      current.filter((project) => project.id !== selectedProject.id)
    )

    setSelectedProject(null)
    setShowDeleteConfirm(false)
    onToast('Projeto excluído com sucesso.', 'warning')
  }

  return (
    <main className="dashboard-content">
      <div className="dashboard-intro">
        <div>
          <span className="eyebrow">GESTÃO DE PRAZOS E ENTREGAS</span>

          <h2>
            Projetos<span className="title-dot">.</span>
          </h2>

          <p>
            Cadastre deadlines, repositórios vinculados e acompanhe entregas
            pelo padrão semáforo.
          </p>
        </div>

        <button className="primary-button" onClick={openCreateForm}>
          <Plus size={16} />
          Novo Projeto
        </button>
      </div>

      <section className="panel elevation-1">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">
              {safeProjects.length} PROJETOS CADASTRADOS
            </span>

            <h2>Projetos em Andamento</h2>
          </div>
        </div>

        {safeProjects.length === 0 ? (
          <div
            style={{
              padding: '48px 20px',
              color: 'var(--muted)',
              textAlign: 'center',
            }}
          >
            <Target size={38} style={{ marginBottom: '12px', opacity: 0.4 }} />
            <p>Nenhum projeto cadastrado.</p>

            <button
              className="primary-button"
              style={{ marginTop: '16px' }}
              onClick={openCreateForm}
            >
              <Plus size={16} />
              Criar primeiro projeto
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '20px',
              padding: '16px',
            }}
          >
            {safeProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}
      </section>

      {showForm && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setEditingProject(null)
            setShowForm(false)
          }}
          onSave={saveProject}
        />
      )}

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEdit={() => openEditForm(selectedProject)}
          onDelete={() => setShowDeleteConfirm(true)}
        />
      )}

      {showDeleteConfirm && selectedProject && (
        <DeleteProjectModal
          project={selectedProject}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={deleteProject}
        />
      )}
    </main>
  )
}