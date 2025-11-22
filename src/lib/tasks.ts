import { TaskStatus } from '@/services/graphql/generated/graphql'

export const getTaskStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.Todo:
        return 'À faire'
      case TaskStatus.InProgress:
        return 'En cours'
      case TaskStatus.Done:
        return 'Terminé'
      default:
        return status
    }
  }

export const statusStyles  = {
  [TaskStatus.Todo]: 'bg-gray-800 text-gray-200 border-gray-700',
  [TaskStatus.InProgress]: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  [TaskStatus.Done]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
}

export type FilterType = TaskStatus | 'ALL'
