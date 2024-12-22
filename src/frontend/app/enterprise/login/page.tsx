'use client'

import Link from 'next/link'
import { AuthLayout } from '@/components/auth-layout'
import { AuthInput } from '@/components/auth-input'

export default function EnterpriseLogin() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <AuthLayout title="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email"
          type="email"
          name="email"
          placeholder="employee@example.com"
        />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link href="/enterprise/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-500">
              Forgot Password?
            </Link>
          </div>
          <AuthInput
            label=""
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Sign In
        </button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/enterprise/register" className="text-emerald-600 hover:text-emerald-500">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}