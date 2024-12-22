import { StatusMessage } from '@/components/status-message'
import { ActionButton } from '@/components/action-button'
import { LogoutButton } from '@/components/logout-button'
import { DashboardLayout } from '@/components/dashboard-layout'

export default function UserDashboard() {
  return (
    <DashboardLayout>
      <StatusMessage 
        count={11}
        message="accounts are secure."
        name="Jeff"
      />
      
      <div className="bg-white rounded-xl p-4 grid grid-cols-3 gap-4">
        <ActionButton
          icon="building"
          label="Manage Companies"
          href="/companies"
        />
        <ActionButton
          icon="key"
          label="Change Passphrase"
          href="/change-password"
        />
        <ActionButton
          icon="user"
          label="View User Profile"
          href="/profile"
        />
      </div>

      <LogoutButton />
    </DashboardLayout>
  )
}