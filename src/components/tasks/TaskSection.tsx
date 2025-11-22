'use client'

import { ProjectTaskItemFragment } from '@/services/graphql/generated/graphql'

import { TaskCard } from './TaskCard'

interface TaskSectionProps {
  title: string
  emptyMessage: string
  tasks: ProjectTaskItemFragment[]
  variant?: 'active' | 'archived'
}

export function TaskSection({ title, emptyMessage, tasks, variant = 'active' }: TaskSectionProps) {
  if (tasks.length === 0 && variant === 'archived') {
    return null
  }

  return (
    <section>
      <h2
        className={
          variant === 'archived'
            ? 'text-lg font-semibold text-gray-300 mb-3'
            : 'text-lg font-semibold text-white mb-3'
        }
      >
        {title} ({tasks.length})
      </h2>

      {tasks.length === 0 ? (
        <div className="text-sm text-gray-500 bg-gray-950 border border-dashed border-gray-800 rounded-lg p-4">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} variant={variant} />
          ))}
        </div>
      )}
    </section>
  )
}
