import { CheckSquare } from 'lucide-react';

import { Task} from '@/services/graphql/generated/graphql';

import CreateTaskFormDialog from './CreateTaskFormDialog';

interface IProps {
  projectId: string
  onCreated: (task: Task) => void
}

export default function TaskEmptyState({projectId, onCreated}: IProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 py-16">
      <div className="bg-gray-800/40 border border-gray-700 rounded-full p-6 mb-6">
        <CheckSquare className="h-12 w-12 text-gray-500" />
      </div>

      <h2 className="text-lg font-semibold text-white mb-2">
        Aucune tâche pour le moment
      </h2>

      <p className="text-sm text-gray-400 mb-6 max-w-sm">
        Ajoute ta première tâche pour commencer à structurer ton projet.
      </p>

      <div className='flex justify-center'>
        <CreateTaskFormDialog projectId={projectId} onCreated={onCreated} />
      </div>
    </div>
  )
}
