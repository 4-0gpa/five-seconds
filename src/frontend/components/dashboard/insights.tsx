'use client'

import { Line } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export function BusinessInsights() {
  const router = useRouter()

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'API Calls',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#7FBFB3',
        tension: 0.4,
      },
    ],
  }

  const pieData = {
    labels: ['GET', 'POST', 'PUT', 'DELETE'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          '#7FBFB3',
          '#9ED5CB',
          '#BBE6DE',
          '#D8F2ED',
        ],
      },
    ],
  }

  // Handle "Go to Broadcast" button click
  const handleGoToBroadcast = () => {
    // Directly use router.push to route to the broadcast page
    router.push('/dashboard/broadcast')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <Link href="/dashboard/broadcast" className="flex items-center mb-4 text-sm">
          <Home className="w-4 h-4 mr-2" />
          Go Home
        </Link>
        
        {/* "Go to Broadcast" button positioned at the top-right */}
        <button
          onClick={handleGoToBroadcast}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Broadcast
        </button>
        
        <h1 className="text-2xl font-bold mb-6">Business Insights</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">API Calls Over Time</h2>
            <Line data={lineData} />
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">API Call Distribution</h2>
            <div className="w-64 mx-auto">
              <Doughnut data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
