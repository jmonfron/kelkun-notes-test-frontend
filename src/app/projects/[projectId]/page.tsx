'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import { ProjectHeader } from '@/components/projects/ProjectHeader'
import { CreateTaskFormDialog } from '@/components/tasks/CreateTaskFormDialog'
import { TaskSection } from '@/components/tasks/TaskSection'
import { TaskStatusTab } from '@/components/tasks/TaskStatusTab'
import { Loader } from '@/components/ui/loader'
import { FilterType } from '@/lib/tasks'
import { ProjectTaskItemFragment , useProjectQuery } from '@/services/graphql/generated/graphql'


export default function ProjectDetailsPage() {
  const params = useParams<{ projectId: string }>()
  const projectId = params.projectId

  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL')

  const { data, loading } = useProjectQuery({
    variables: { id: projectId, status: activeFilter === 'ALL' ? undefined : activeFilter },
    skip: !projectId
  })

  const project = data?.project
  const archivedTasks: ProjectTaskItemFragment[] = project?.archiveTasks ?? []
  const activeTasks: ProjectTaskItemFragment[] = project?.activeTasks ?? []

  if (loading) {
    return <Loader label="Chargement du projet…" />
  }

  if (!project) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Projet introuvable
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
          <p>{`Ce projet n'existe pas ou n'est pas accessible.`}</p>
          <button
            onClick={() => history.back()}
            className="px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-sm text-gray-100 hover:bg-gray-800 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-between mb-6">
        <ProjectHeader name={project.name} createdAt={project.createdAt} />
        <div className='flex justify-end mb-4'>
          <CreateTaskFormDialog
            projectId={project.id}
          />
        </div>
       <TaskStatusTab activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        <TaskSection
          title="Tâches"
          emptyMessage="Aucune tâche active pour ce projet."
          tasks={activeTasks}
          variant="active"
        />

        <TaskSection
          title="Tâches archivées"
          emptyMessage="Aucune tâche archivée pour ce projet."
          tasks={archivedTasks}
          variant="archived"
        />
      </div>
    </div>
  )
}
