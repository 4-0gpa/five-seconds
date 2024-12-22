interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-emerald-400 p-6 space-y-6">
      {children}
    </div>
  )
}

