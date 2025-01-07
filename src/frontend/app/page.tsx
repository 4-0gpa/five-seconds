import Link from 'next/link'
import { Building2, User } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-16 text-center">
        Welcome to 5seconds.
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl w-full">
        <Link href="/enterprise/login">
          <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
            <Building2 className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">enterprise</h2>
            <p className="text-gray-600 text-sm">
              company account access
            </p>
          </div>
        </Link>
        
        <Link href="/personal/login">
          <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
            <User className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">personal</h2>
            <p className="text-gray-600 text-sm">
              personal account access
            </p>
          </div>
        </Link>
      </div>
    </main>
  )
}

