import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import 'chartjs-adapter-date-fns';

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

function LineGraph({ waterData, title , className = "" }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        if (!waterData || waterData.length === 0) return;

        // Sort and format data
        const sortedData = [...waterData].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        setChartData({
            labels: sortedData.map((reading) => reading.timestamp),
            datasets: [
                {
                    label: title || 'Water Usage',
                    data: sortedData.map((reading) => reading.watered_amount),
                    fill: true,
                    backgroundColor: 'rgba(173, 216, 230, 0.4)', // light blue fill
                    borderColor: 'rgba(0, 123, 255, 1)',
                    pointBackgroundColor: 'rgba(0, 123, 255, 1)',
                    tension: 0.4,
                },
            ],
        });
    }, [waterData, title]);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: title || 'Watering Over Time',
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                    tooltipFormat: 'PPpp',
                },
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                beginAtZero: true,
                suggestedMax: 50,
                title: {
                    display: true,
                    text: 'Watered Amount',
                },
            },
        },
    };

    return (
        <div className={`${className}p-4 bg-white shadow-md rounded-xl w-full max-w-4xl mx-auto`}>
            <div className="h-72">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}

export default LineGraph;
