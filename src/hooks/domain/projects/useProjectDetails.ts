import { useMemo,useState } from 'react'

import { FilterType } from '@/lib/tasks'
import { useProjectQuery } from '@/services/graphql/generated/graphql'

export function useProjectDetails(projectId: string) {
  const [filter, setFilter] = useState<FilterType>('ALL')

  const { data, loading, refetch } = useProjectQuery({
    variables: {
      id: projectId,
      status: filter === 'ALL' ? undefined : filter
    },
    skip: !projectId,
    fetchPolicy: 'cache-and-network'
  })

  const project = data?.project
  const activeTasks = useMemo(() => project?.activeTasks ?? [], [project])
  const archivedTasks = useMemo(() => project?.archiveTasks ?? [], [project])

  const hasTasks = activeTasks.length > 0 || archivedTasks.length > 0
  const isFiltering = filter !== 'ALL'

  const showOnboarding = !loading && project && !hasTasks && !isFiltering

  return {
    project,
    loading: loading && !project,
    activeTasks,
    archivedTasks,
    filter,
    setFilter,
    refetch,
    showOnboarding,
    isFiltering
  }
}
