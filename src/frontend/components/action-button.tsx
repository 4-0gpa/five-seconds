import Link from 'next/link'
import { Settings, BarChart3, UserCircle, KeyRound, Building2 } from 'lucide-react'

const icons = {
  settings: Settings,
  chart: BarChart3,
  user: UserCircle,
  key: KeyRound,
  building: Building2,
}

interface ActionButtonProps {
  icon: keyof typeof icons
  label: string
  href: string
}

export function ActionButton({ icon, label, href }: ActionButtonProps) {
  const Icon = icons[icon]
  
  return (
    <Link 
      href={href}
      className="flex flex-col items-center gap-2 p-4 text-gray-700 hover:text-gray-900 transition-colors"
    >
      <Icon size={24} />
      <span className="text-sm text-center">{label}</span>
    </Link>
  )
}