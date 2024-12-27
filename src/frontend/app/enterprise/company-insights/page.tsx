'use client'

import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

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

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'API Calls',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: '#98e0c5',
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
        '#98e0c5',
        '#7ac9aa',
        '#5cb290',
        '#3e9b76',
      ],
    },
  ],
}

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'API Calls Over Time',
    },
  },
}

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'API Call Distribution',
    },
  },
}

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-2xl font-bold">Business Insights</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            No. of API calls from https://www.singtel.com/
          </h2>
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            API call distribution
          </h2>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  )
}