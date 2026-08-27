"use client";

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { DashboardMetrics } from 'apps/shell/src/types'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ShipmentStatusDoughnut({ metrics }: { metrics: DashboardMetrics }) {
  const data = {
    labels: ['Delivered', 'In Transit', 'Pending', 'Delayed'],
    datasets: [
      {
        data: [metrics.delivered, metrics.inTransit, metrics.pending, metrics.delayed],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
      }
    ]
  }

  return <Doughnut data={data} />
}
