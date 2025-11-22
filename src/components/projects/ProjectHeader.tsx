'use client'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

interface ProjectHeaderProps {
  name: string
  createdAt: string | Date
}

export function ProjectHeader({ name, createdAt }: ProjectHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          {name}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Créé le{' '}
          <span className="text-gray-300">
            {dayjs(createdAt).format('DD MMM YYYY')}
          </span>
        </p>
      </div>
      <button
        onClick={() => router.push('/projects')}
        className="px-4 py-2 rounded-md bg-gray-950 border border-gray-800 text-sm text-gray-100 hover:bg-gray-900 transition-colors"
      >
        Retour aux projets
      </button>
    </div>
  )
}
