'use client'

import dayjs from 'dayjs'

import { getTaskStatusLabel, statusStyles } from '@/lib/tasks'
import {
  ProjectTaskItemFragment
} from '@/services/graphql/generated/graphql'

import UpdateTaskFormDialog from './UpdateTaskFormDialog'


interface IProps {
  task: ProjectTaskItemFragment
  variant?: 'active' | 'archived'
}



export default function TaskItem({ task, variant = 'active' }: IProps) {
  const isArchived = variant === 'archived'

  const containerClasses = isArchived
    ? 'bg-gray-950/80 border-gray-800 opacity-75'
    : 'bg-gray-950 border-gray-800 hover:bg-gray-900'

  const titleClasses = isArchived
    ? 'text-gray-300'
    : 'text-white'

  const descriptionClasses = isArchived
    ? 'text-gray-500'
    : 'text-gray-400'

  const badgeClasses = isArchived
    ? 'bg-gray-900/60 text-gray-400 border-gray-800'
    : statusStyles[task.status] || 'bg-gray-800 text-gray-400 border-gray-700'

  return (

    <UpdateTaskFormDialog task={task} >
      <div
        className={`rounded-lg border p-4 ${containerClasses}`}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className={`text-base font-semibold truncate ${titleClasses}`}>
            {task.title}
          </h3>

          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${badgeClasses}`}
          >
            {isArchived ? 'Archivée' : getTaskStatusLabel(task.status)}
          </span>
        </div>

        <div className="mt-2 min-h-[1.5rem]">
          {task.description && (
            <p
              className={`text-sm line-clamp-3 text-blue-700 ${descriptionClasses}`}
            >
              {task.description}
            </p>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Créé le{' '}
          <span className="text-gray-300">
            {dayjs(task.createdAt).format('DD MMM YYYY')}
          </span>
        </p>
      </div>
    </UpdateTaskFormDialog>
  )
}
