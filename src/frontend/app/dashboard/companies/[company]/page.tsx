// app/companies/[companyId].tsx
import { useRouter } from 'next/router'

export default function CompanyDetail() {
  const { query } = useRouter()
  const { companyId } = query

  return (
    <div>
      <h1>Company Detail for ID: {companyId}</h1>
      {/* Fetch and display company details using companyId */}
    </div>
  )
}
