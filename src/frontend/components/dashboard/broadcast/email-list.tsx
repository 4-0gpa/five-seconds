'use client'

import { useState } from 'react'
import { Mail, Send, Clock, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Email {
    id: string
    subject: string
    preview: string
    recipients: number
    sentAt: string
    status: 'sent' | 'draft'
}

const MOCK_EMAILS: Email[] = [
    {
        id: '1',
        subject: 'Important Security Update',
        preview: 'We have updated our security protocols...',
        recipients: 1500,
        sentAt: '2024-01-10 14:30',
        status: 'sent'
    },
    {
        id: '2',
        subject: 'New Feature Announcement',
        preview: 'We are excited to announce...',
        recipients: 2000,
        sentAt: '2024-01-09 10:15',
        status: 'sent'
    },
    {
        id: '3',
        subject: 'Customer Satisfaction Survey',
        preview: 'Help us improve our services...',
        recipients: 1200,
        sentAt: '2024-01-08 22:15',
        status: 'draft'
    }
]

export function BroadcastEmailList() {
  const [search, setSearch] = useState('')
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Broadcast Emails</h1>
        <Button onClick={() => window.location.href = '/dashboard/broadcast/compose'}>
          <Mail className="mr-2 h-4 w-4" />
          Compose New
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search emails"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="sent" className="w-full">
        <TabsList>
          <TabsTrigger value="sent">
            <Send className="mr-2 h-4 w-4" />
            Sent
          </TabsTrigger>
          <TabsTrigger value="drafts">
            <Clock className="mr-2 h-4 w-4" />
            Drafts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sent">
          <div className="space-y-4">
            {MOCK_EMAILS.filter(email => email.status === 'sent').map(email => (
              <div key={email.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{email.subject}</h3>
                  <span className="text-sm text-gray-500">{email.sentAt}</span>
                </div>
                <p className="text-gray-600 mb-2">{email.preview}</p>
                <div className="text-sm text-gray-500">
                  Sent to {email.recipients} recipients
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="space-y-4">
            {MOCK_EMAILS.filter(email => email.status === 'draft').map(email => (
              <div key={email.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-2">{email.subject}</h3>
                <p className="text-gray-600 mb-2">{email.preview}</p>
                <div className="text-sm text-gray-500">
                  Target: {email.recipients} recipients
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
