'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  
  return (
    <button
      onClick={() => router.back()}
      className="absolute left-4 top-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
    >
      <ChevronLeft className="mr-1 h-4 w-4" />
      back
    </button>
  )
}