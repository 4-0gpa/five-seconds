'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export function EmailComposer() {
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  const handleSend = () => {
    console.log('Sending email:', { subject, content })
  }

  const handleSaveDraft = () => {
    console.log('Saving draft:', { subject, content })
  }

  return (
    <div className="p-6">
      <Link href="/dashboard/broadcast" className="inline-flex items-center text-sm mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Broadcasts
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Compose Broadcast Email</h1>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Message"
              className="min-h-[300px]"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button onClick={handleSend}>
              Send Broadcast
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}