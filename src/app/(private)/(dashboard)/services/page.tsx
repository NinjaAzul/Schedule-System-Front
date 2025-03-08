import { Actions } from './actions'
import { ServiceCard } from './service-card'

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-4">
      <Actions />
      <div className="flex flex-col gap-4">
        <ServiceCard />
      </div>
    </div>
  )
}
