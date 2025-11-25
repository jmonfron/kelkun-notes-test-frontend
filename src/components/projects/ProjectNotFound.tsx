export default function ProjectNotFound() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
        Projet introuvable
      </h1>
      <p className="text-gray-400 mb-6">
        Ce projet n'existe pas ou vous n'avez pas les droits pour y accéder.
      </p>
    </div>
  )
}
