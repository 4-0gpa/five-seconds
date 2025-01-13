'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, CheckCircle, AlertTriangle, Flag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface Email {
  id: string
  subject: string
  sender: string
  content: string
  receivedAt: string
  safety: 'safe' | 'suspicious' | 'unsafe'
}

const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    subject: 'Your Account Security',
    sender: 'Singtel <security@singtel.com>',
    content: 'We have detected unusual activity on your account. Please log in to your account and verify your recent activities. If you did not perform these actions, please contact our customer support immediately.\n\nBest regards,\nSingtel Security Team',
    receivedAt: '2024-01-10 14:30',
    safety: 'safe'
  },
  {
    id: '2',
    subject: 'Limited Time Offer',
    sender: 'StarHub <offers@starhub.com>',
    content: 'Exclusive deals just for you! For a limited time, enjoy up to 50% off on our latest mobile plans. Don\'t miss out on this incredible opportunity to upgrade your service.\n\nVisit our website or your nearest StarHub store to learn more.\n\nTerms and conditions apply.',
    receivedAt: '2024-01-09 10:15',
    safety: 'suspicious'
  },
  {
    id: '3',
    subject: 'Urgent: Action Required',
    sender: 'Unknown Sender <noreply@unknownsender.com>',
    content: 'Your account will be terminated within 24 hours unless you verify your information immediately. Click the link below to confirm your details:\n\n[Suspicious Link Removed]\n\nThis message has been flagged as potentially unsafe. Please do not click on any links or provide any personal information.',
    receivedAt: '2024-01-08 09:20',
    safety: 'unsafe'
  }
]

export function EmailDetail({ emailId }: { emailId: string }) {
  const [email, setEmail] = useState<Email | null>(null)

  useEffect(() => {
    // In a real application, you would fetch the email data from your API
    const fetchedEmail = MOCK_EMAILS.find(e => e.id === emailId)
    setEmail(fetchedEmail || null)
  }, [emailId])

  if (!email) {
    return <div>Email not found</div>
  }

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
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/dashboard/inbox" className="inline-flex items-center text-sm mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Inbox
      </Link>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{email.subject}</h1>
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

        <div className="mb-4">
          <p className="text-sm text-gray-600">From: {email.sender}</p>
          <p className="text-sm text-gray-600">Received: {email.receivedAt}</p>
        </div>

        <div className="border-t pt-4">
          <p className="whitespace-pre-wrap">{email.content}</p>
        </div>
      </div>
    </div>
  )
}
