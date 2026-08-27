"use client";

import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

// For demo, generate synthetic data. In Phase 10 this will be replaced with server-provided time series.
const generateDemoSeries = () => {
  const labels = Array.from({ length: 12 }).map((_, i) => `M${i + 1}`)
  const data = Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 200) + 20)
  return { labels, data }
}

export default function ShipmentVolumeLine() {
  const series = generateDemoSeries()
  const data = {
    labels: series.labels,
    datasets: [
      {
        label: 'Shipments',
        data: series.data,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59,130,246,0.2)'
      }
    ]
  }

  return <Line data={data} />
}
