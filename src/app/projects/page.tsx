'use client'

import {useRouter} from 'next/navigation';

import CreateProjectFormDialog from '@/components/projects/CreateProjectFormDialog';
import ProjectEmptyState from '@/components/projects/ProjectEmptyState';
import ProjectItem from '@/components/projects/ProjectItem';
import {useAuth} from '@/providers/AuthProvider'
import {Project, useAllProjectsQuery} from '@/services/graphql/generated/graphql'

export default function ProjectsPage() {
  const {user} = useAuth()
  const router = useRouter()
  const {data, loading, refetch} = useAllProjectsQuery({
    variables: {
      dto: {
        userId: user?.id as string
      }
    },
    skip: !user?.id
  })
  const projects = data?.allProjects || []
  const handleCreated = async (project: Project) => {
    await refetch()
    router.push(`/projects/${project.id}`)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <div className="animate-pulse">Chargement des projets...</div>
      </div>
    )
  }
  if (projects.length === 0) {
    return <ProjectEmptyState onCreated={handleCreated}/>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Mes projets
        </h1>
        <CreateProjectFormDialog onCreated={handleCreated}/>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectItem project={project as Project} key={project.id}/>
          ))}
        </div>
      </div>
    </div>
  )
}
