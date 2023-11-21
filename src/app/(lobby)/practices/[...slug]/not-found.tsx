import { ErrorCard } from '@/components/cards/error-card'
import { Shell } from '@/components/shells/shell'

export default function PracticesNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Práctica no encontrada"
        description="La práctica que buscas no existe o no está disponible."
        retryLink="/practices"
        retryLinkText="Volver a prácticas"
      />
    </Shell>
  )
}
