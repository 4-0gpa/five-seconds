'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { sha3_512 } from 'js-sha3'

interface RegisterFormProps {
  type: 'personal' | 'enterprise'
  onSubmit?: (data: any) => void
}

export function RegisterForm({ type, onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <div className="min-h-screen flex flex-col p-4">
      <Link href="/" className="flex items-center text-sm mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" />
        back
      </Link>
      
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Register.
          <p className="text-sm font-normal mt-1">
            Create a new {type} account.
          </p>
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {type === 'enterprise' && (
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          Return to{' '}
          <Link href={`/${type}/login`} className="underline">
            sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

