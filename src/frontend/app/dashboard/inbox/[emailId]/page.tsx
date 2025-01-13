import { EmailDetail } from '@/components/dashboard/inbox/email-detail'

export default function EmailDetailPage({ params }: { params: { emailId: string } }) {
  return <EmailDetail emailId={params.emailId} />
}
