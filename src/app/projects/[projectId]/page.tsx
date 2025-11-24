'use client'

import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import CreateTaskFormDialog from '@/components/tasks/CreateTaskFormDialog'
import TaskEmptyState from '@/components/tasks/TaskEmptyState'
import TaskSection from '@/components/tasks/TaskSection'
import TaskStatusTab from '@/components/tasks/TaskStatusTab'
import { FilterType } from '@/lib/tasks'
import { ProjectTaskItemFragment , TaskStatus, useProjectQuery } from '@/services/graphql/generated/graphql'

const getEmptyMessage = (filter: FilterType): string => {
  const messages: Record<string, string> = {
    [TaskStatus.Todo]: 'Aucune tâche à faire.',
    [TaskStatus.InProgress]: 'Aucune tâche en cours.',
    [TaskStatus.Done]: 'Aucune tâche terminée.',
    ALL: 'Aucune tâche pour ce projet.'
  }
  return messages[filter] || 'Aucune tâche trouvée.'
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

export default function ProjectDetailsPage() {
  const params = useParams<{ projectId: string }>()
  const projectId = params.projectId

  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL')

  const { data, loading, refetch} = useProjectQuery({
    variables: { id: projectId, status: activeFilter === 'ALL' ? undefined : activeFilter },
    skip: !projectId,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })

  const project = data?.project

  if (loading) {
    return  <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <div className="animate-pulse">Chargement des projets...</div>
    </div>
  }

  if (!project) {
    return <ProjectNotFound />
  }

  const archivedTasks: ProjectTaskItemFragment[] = project?.archiveTasks ?? []
  const activeTasks: ProjectTaskItemFragment[] = project?.activeTasks ?? []

  const hasTasks = activeTasks.length > 0 || archivedTasks.length > 0
  const isFiltering = activeFilter !== 'ALL'

  if (!hasTasks && !isFiltering) {
    return (
      <TaskEmptyState
        projectId={projectId}
        onCreated={() => refetch()}
      />
    )
  }

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
      <TaskStatusTab activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <div className="flex-1 overflow-y-auto space-y-6">
        <TaskSection
          title="Tâches"
          emptyMessage={getEmptyMessage(activeFilter)}
          tasks={activeTasks}
          variant="active"
        />

        <TaskSection
          title="Tâches archivées"
          emptyMessage="Aucune tâche archivée."
          tasks={archivedTasks}
          variant="archived"
        />
      </div>
    </div>
  )
}
