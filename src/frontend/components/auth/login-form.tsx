'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'; /*  IMPORTANT TO IMPORT FROM NEXT/NAVIGATION AS OPPOSED TO NEXT/ROUTER FOR THE PURPOSES OF OUR APP DIRECTORY **/
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { sha3_512 } from 'js-sha3'
import axios from 'axios';
import NextCors from 'nextjs-cors';

interface LoginFormProps {
  type: 'personal' | 'enterprise'
  onSubmit?: (email: string, password: string) => void
}

export function LoginForm({ type, onSubmit }: LoginFormProps) {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hash the password (ensure you've imported sha3_512 or similar)
    const hashedPassword = sha3_512(password).toString();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        hashedPassword: hashedPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log(response.data);

      if (response.data.status && response.data.type == 'company') {
        router.push("/dashboard/insights")
      } else if (response.data.status && response.data.type == 'user') {
        router.push("/dashboard/inbox")
      }
      else {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error during API request:', error);
      setMessage('Error connecting to the server.');
    }
  };

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
