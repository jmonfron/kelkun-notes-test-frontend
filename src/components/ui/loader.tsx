'use client'

interface LoaderProps {
  label?: string
}

export function Loader({ label = 'Chargement…'}: LoaderProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="animate-pulse">{label}<div>
        </div>
        </div>
      </div>
    </div>
  )
}
