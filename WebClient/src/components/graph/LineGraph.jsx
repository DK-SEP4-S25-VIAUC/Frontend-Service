"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  TimeScale,
} from "chart.js"
import "chartjs-adapter-date-fns"

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler, TimeScale)

function LineGraph({ waterData, title, className = "" }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    if (!waterData || waterData.length === 0) return

    // Sort and format data
    const sortedData = [...waterData].sort((a, b) => new Date(a.time_stamp) - new Date(b.time_stamp))

    setChartData({
      labels: sortedData.map((reading) => reading.time_stamp),
      datasets: [
        {
          label: title || "Water Usage",
          data: sortedData.map((reading) => reading.watered_amount),
          fill: true,
          backgroundColor: "rgba(59, 130, 246, 0.2)", // blue-500 with opacity
          borderColor: "rgba(59, 130, 246, 1)", // blue-500
          pointBackgroundColor: "rgba(59, 130, 246, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(59, 130, 246, 1)",
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
        },
      ],
    })
  }, [waterData, title])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1f2937", // gray-800
        bodyColor: "#4b5563", // gray-600
        borderColor: "rgba(229, 231, 235, 1)", // gray-200
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => `Amount: ${context.raw} units`,
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "HH:mm", // 24-hour format for tooltips
        displayFormats: {
            hour: "HH:mm", // 24-hour format for x-axis labels
        },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          padding: 10,
          color: "#6b7280", // gray-500
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 30,
        grid: {
          color: "rgba(243, 244, 246, 1)", // gray-100
          drawBorder: false,
        },
        ticks: {
          padding: 10,
          color: "#6b7280", // gray-500
          font: {
            size: 11,
          },
        },
        title: {
          display: true,
          text: "Watered Amount",
          color: "#6b7280", // gray-500
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  }

  return (
    <div className={`${className} bg-white dark:bg-gray-800 w-full`}>
      {waterData && waterData.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-400">No water usage data available</p>
        </div>
      )}
    </div>
  )
}

export default LineGraph
