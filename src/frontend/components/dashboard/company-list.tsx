'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Home, Search } from 'lucide-react'
import Link from 'next/link'

interface Company {
  id: string
  name: string
  logo: string
  path: string // Added the path for the slug
}

const MOCK_COMPANIES: Company[] = [
  { id: '1', name: 'Singtel', logo: '/placeholder.svg?height=40&width=100', path: 'singtel' },
  { id: '2', name: 'Starhub', logo: '/placeholder.svg?height=40&width=100', path: 'starhub' },
  { id: '3', name: 'Simba', logo: '/placeholder.svg?height=40&width=100', path: 'simba' },
  { id: '4', name: 'SPX Capital', logo: '/placeholder.svg?height=40&width=100', path: 'spx_capital' },
  { id: '5', name: 'SGH', logo: '/placeholder.svg?height=40&width=100', path: 'sgh' },
  { id: '6', name: 'SGX Group', logo: '/placeholder.svg?height=40&width=100', path: 'sgx_group' },
  { id: '7', name: 'STB', logo: '/placeholder.svg?height=40&width=100', path: 'stb' },
]

export function CompanyList() {
  const [search, setSearch] = useState('')
  const filteredCompanies = MOCK_COMPANIES.filter(company =>
    company.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <Link href="/dashboard/companies" className="flex items-center mb-4 text-sm">
          <Home className="w-4 h-4 mr-2" />
          Go Home
        </Link>
        
        <h1 className="text-2xl font-bold mb-6">Manage Companies</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search companies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="space-y-2">
          {filteredCompanies.map(company => (
            <Link
              key={company.id}
              href={`/companies/${company.path}`} // Changed to use the `path` slug instead of `id`
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-24 h-8 object-contain"
              />
              <span className="ml-4">{company.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
