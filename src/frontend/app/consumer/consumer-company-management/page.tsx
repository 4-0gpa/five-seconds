import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const companies = [
  { id: 1, name: 'Singtel', logo: '/singtel-logo.png' },
  { id: 2, name: 'Starhub', logo: '/starhub-logo.png' },
  { id: 3, name: 'Simba', logo: '/simba-logo.png' },
  { id: 4, name: 'SPX Capital', logo: '/spx-logo.png' },
  { id: 5, name: 'SGH', logo: '/sgh-logo.png' },
  { id: 6, name: 'SGX Group', logo: '/sgx-logo.png' },
  { id: 7, name: 'STB', logo: '/stb-logo.png' },
]

export default function CompaniesPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Manage Companies</h1>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search companies"
          className="pl-10"
        />
      </div>
      <div className="space-y-3">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <span className="font-medium">{company.name}</span>
            </div>
            <input type="radio" name="company" className="h-4 w-4" />
          </div>
        ))}
      </div>
    </div>
  )
}