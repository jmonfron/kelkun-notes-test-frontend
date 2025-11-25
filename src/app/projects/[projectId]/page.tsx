'use client'

import dayjs from 'dayjs'
import { useParams } from 'next/navigation'

import CreateTaskFormDialog from '@/components/tasks/CreateTaskFormDialog'
import TaskEmptyState from '@/components/tasks/TaskEmptyState'
import TaskSection from '@/components/tasks/TaskSection'
import TaskStatusTab from '@/components/tasks/TaskStatusTab'
import { useProjectDetails } from '@/hooks/domain/projects/useProjectDetails'
import {  TaskStatus } from '@/services/graphql/generated/graphql'

const EMPTY_MESSAGES: Record<string, string> = {
  [TaskStatus.Todo]: 'Aucune tâche à faire.',
  [TaskStatus.InProgress]: 'Aucune tâche en cours.',
  [TaskStatus.Done]: 'Aucune tâche terminée.',
  ALL: 'Aucune tâche pour ce projet.'
}

const ProjectNotFound = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
        Projet introuvable
      </h1>
      <p className="text-gray-400 mb-6">
        Ce projet n'existe pas ou vous n'avez pas les droits pour y accéder.
      </p>
    </div>
  )
}

const ProjectLoading = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400">
    <div className="animate-pulse">Chargement du projet...</div>
  </div>
)

export default function ProjectDetailsPage() {
  const params = useParams<{ projectId: string }>()

  const {
    project,
    loading,
    activeTasks,
    archivedTasks,
    filter,
    setFilter,
    refetch,
    showOnboarding,
    isFiltering
  } = useProjectDetails(params.projectId)

  if (loading) return <ProjectLoading />

  if (!project) return <ProjectNotFound />

  if (showOnboarding) return <TaskEmptyState projectId={project.id} onCreated={refetch}/>


  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {project.name}
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Créé le{' '}
            <span className="text-gray-300">
              {dayjs(project.createdAt).format('DD MMM YYYY')}
            </span>
          </p>
        </div>
        <CreateTaskFormDialog
          projectId={project.id}
          onCreated={() => { refetch() }}
        />
      </div>
      <TaskStatusTab activeFilter={filter} setActiveFilter={setFilter} />

      <div className="flex-1 overflow-y-auto space-y-6">
        <TaskSection
          title="Tâches"
          emptyMessage={EMPTY_MESSAGES[filter] || 'Aucune tâche trouvée.'}
          tasks={activeTasks}
          variant="active"
        />

        {!isFiltering && (
          <TaskSection
            title="Tâches archivées"
            emptyMessage="Aucune tâche archivée."
            tasks={archivedTasks}
            variant="archived"
          />
        )}

      </div>
    </div>
  )
}
