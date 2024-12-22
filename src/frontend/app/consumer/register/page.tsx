'use client'

import Link from 'next/link'
import { AuthLayout } from '@/components/auth-layout'
import { AuthInput } from '@/components/auth-input'

export default function ConsumerRegister() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle registration logic here
  }

  return (
    <AuthLayout 
      title="Register" 
      subtitle="Create a new user account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Name"
          name="name"
          placeholder="Enter your name"
        />
        <AuthInput
          label="Email"
          type="email"
          name="email"
          placeholder="jeff@example.com"
        />
        <AuthInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter a password"
        />
        <AuthInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
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