"use client";

import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
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
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  TimeScale
);

function SoilLineGraph({ soilData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const scrollRef = useRef(null); 

  useEffect(() => {
    if (!soilData || soilData.length === 0) return;

    const sortedData = [...soilData].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    setChartData({
      labels: sortedData.map((reading) => reading.timestamp),
      datasets: [
        {
          label: "Soil Humidity",
          data: sortedData.map((reading) => reading.soil_humidity),
          fill: true,
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          borderColor: "rgba(16, 185, 129, 1)",
          pointBackgroundColor: "rgba(16, 185, 129, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(16, 185, 129, 1)",
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
        },
      ],
    });

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [soilData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {SoilLineGraph,
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
        titleColor: "#1f2937",
        bodyColor: "#4b5563",
        borderColor: "rgba(229, 231, 235, 1)",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => `Humidity: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "PPpp", 
          displayFormats: {
            hour: "MMM d, HH:mm", 
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          padding: 10,
          color: "#6b7280",
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        grid: {
          color: "rgba(243, 244, 246, 1)",
          drawBorder: false,
        },
        ticks: {
          padding: 10,
          color: "#6b7280",
          font: {
            size: 11,
          },
        },
        title: {
          display: true,
          text: "Soil Humidity (%)",
          color: "#6b7280",
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
  };

  return (
    <div
      ref={scrollRef}
      className={`bg-white dark:bg-gray-800 w-full overflow-x-auto`}
    >
      <div className="min-w-[1500px] h-80">
        {soilData && soilData.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              No soil humidity data available ( ͡° ʖ̯ ͡°)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SoilLineGraph;
