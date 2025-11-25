'use client'

import { ProjectTaskItemFragment } from '@/services/graphql/generated/graphql'

import TaskItem from './TaskItem'


interface IProps {
  title: string
  emptyMessage: string
  tasks: ProjectTaskItemFragment[]
  variant?: 'active' | 'archived'
}

export default function TaskSection({ title, emptyMessage, tasks, variant = 'active' }: IProps) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} variant={variant} />
          ))}
        </div>
      )}
    </section>
  )
}
