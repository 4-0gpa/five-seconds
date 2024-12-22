import Link from 'next/link'
import { Building2, User } from 'lucide-react'
import { AuthLayout } from '@/components/auth-layout'

export default function UserTypeSelection() {
  return (
    <AuthLayout title="Welcome to 5seconds">
      <div className="grid gap-4">
        <Link 
          href="/consumer/login"
          className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <User className="w-6 h-6" />
          <div>
            <h2 className="font-medium">Consumer</h2>
            <p className="text-sm text-gray-500">Personal account access</p>
          </div>
        </Link>
        <Link 
          href="/enterprise/login"
          className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Building2 className="w-6 h-6" />
          <div>
            <h2 className="font-medium">Enterprise</h2>
            <p className="text-sm text-gray-500">Company account access</p>
          </div>
        </Link>
      </div>
    </AuthLayout>
  )
}