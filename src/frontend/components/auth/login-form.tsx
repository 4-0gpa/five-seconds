'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LoginFormProps {
  type: 'personal' | 'enterprise'
  onSubmit?: (email: string, password: string) => void
}

export function LoginForm({ type, onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(email, password)
  }

  return (
    <div className="min-h-screen flex flex-col p-4">
      <Link href="/" className="flex items-center text-sm mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" />
        back
      </Link>
      
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sign in to your account.</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm underline">
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link href={`/${type}/register`} className="underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
