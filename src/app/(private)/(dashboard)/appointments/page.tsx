import { Actions } from './actions'
import { AppointmentsCard } from './appointments'

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Actions />
      <div className="flex flex-col gap-4">
        <AppointmentsCard />
      </div>
    </div>
  )
}
