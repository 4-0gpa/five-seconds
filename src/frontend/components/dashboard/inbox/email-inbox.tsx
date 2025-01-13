'use client'

import { useState } from 'react'
import { Search, CheckCircle, AlertTriangle, Flag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface Email {
  id: string
  subject: string
  sender: string
  preview: string
  receivedAt: string
  safety: 'safe' | 'suspicious' | 'unsafe'
  read: boolean
}

const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    subject: 'Your Account Security',
    sender: 'Singtel',
    preview: 'We have detected unusual activity...',
    receivedAt: '2024-01-10 14:30',
    safety: 'safe',
    read: false
  },
  {
    id: '2',
    subject: 'Limited Time Offer',
    sender: 'StarHub',
    preview: 'Exclusive deals just for you...',
    receivedAt: '2024-01-09 10:15',
    safety: 'suspicious',
    read: true
  },
  {
    id: '3',
    subject: 'Urgent: Action Required',
    sender: 'Unknown Sender',
    preview: 'Your account will be terminated...',
    receivedAt: '2024-01-08 09:20',
    safety: 'unsafe',
    read: false
  }
]

export function EmailInbox() {
  const [search, setSearch] = useState('')

  const getSafetyIcon = (safety: Email['safety']) => {
    switch (safety) {
      case 'safe':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'suspicious':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case 'unsafe':
        return <Flag className="h-5 w-5 text-red-500" />
    }
  }

  const getSafetyText = (safety: Email['safety']) => {
    switch (safety) {
      case 'safe':
        return 'Verified Safe'
      case 'suspicious':
        return 'Suspicious'
      case 'unsafe':
        return 'Unsafe'
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Email Inbox</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search emails"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {MOCK_EMAILS.map(email => (
          <Link 
            key={email.id} 
            href={`/dashboard/inbox/${email.id}`}
            className={`block p-4 border rounded-lg hover:bg-gray-50 ${
              !email.read ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{email.subject}</h3>
                <p className="text-sm text-gray-600">From: {email.sender}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getSafetyIcon(email.safety)}
                <Badge variant={
                  email.safety === 'safe' ? 'default' :
                  email.safety === 'suspicious' ? 'warning' : 'destructive'
                }>
                  {getSafetyText(email.safety)}
                </Badge>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{email.preview}</p>
            <div className="text-sm text-gray-500">
              {email.receivedAt}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}