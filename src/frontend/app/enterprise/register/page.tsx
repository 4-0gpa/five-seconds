'use client'

import Link from 'next/link'
import { AuthLayout } from '@/components/auth-layout'
import { AuthInput } from '@/components/auth-input'

export default function EnterpriseRegister() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle registration logic here
  }

  return (
    <AuthLayout 
      title="Register" 
      subtitle="Create a new company account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Name"
          name="name"
          placeholder="Enter your name"
        />
        <AuthInput
          label="Company Email"
          type="email"
          name="email"
          placeholder="employee@example.com"
        />
        <AuthInput
          label="Company name"
          name="companyName"
          placeholder="Enter your company name"
        />
        <AuthInput
          label="ACRA UEN"
          name="acraUen"
          placeholder="Enter your Company ACRA UEN"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Register
        </button>
      </form>
    </AuthLayout>
  )
}