import { FilterType } from '@/lib/tasks'
import { cn } from '@/lib/utils'
import { TaskStatus } from '@/services/graphql/generated/graphql'


const STATUS_FILTERS: {label: string, value: FilterType}[] = [
  { label: 'Toutes', value: 'ALL' },
  { label: 'À faire', value: TaskStatus.Todo },
  { label: 'En cours', value: TaskStatus.InProgress },
  { label: 'Terminées', value: TaskStatus.Done }
]

interface IProps {
  activeFilter: FilterType
  setActiveFilter: (filter: FilterType) => void
}
export default function TaskStatusTab({ activeFilter, setActiveFilter   }: IProps) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-800 py-4 mb-4 justify-between md:justify-start">
      {STATUS_FILTERS.map((filter) => {
        const isActive = activeFilter === filter.value
        return (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
              isActive
                ? 'bg-gray-100 text-gray-950 shadow-sm'
                : 'bg-gray-900/50 text-gray-400 hover:text-gray-200 hover:bg-gray-800'
            )}
          >
            {filter.label}
          </button>
        )
      })}
    </div>

  )

}
