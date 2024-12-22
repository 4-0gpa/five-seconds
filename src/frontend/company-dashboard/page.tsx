import { StatusMessage } from '@/components/status-message'
import { ActionButton } from '@/components/action-button'
import { LogoutButton } from '@/components/logout-button'
import { DashboardLayout } from '@/components/dashboard-layout'

export default function CompanyDashboard() {
  return (
    <DashboardLayout>
      <StatusMessage 
        count={0}
        message="copycat domains found. All is well"
        name="Singtel employee"
      />
      
      <div className="bg-white rounded-xl p-4 grid grid-cols-3 gap-4">
        <ActionButton
          icon="chart"
          label="Business Insights"
          href="/insights"
        />
        <ActionButton
          icon="settings"
          label="Manage API"
          href="/api-settings"
        />
        <ActionButton
          icon="user"
          label="View Company Profile"
          href="/company"
        />
      </div>

      <LogoutButton />
    </DashboardLayout>
  )
}