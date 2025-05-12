import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Graph({ data, title }) {
    const [history, setHistory] = useState([]);


    useEffect(() => {
        setHistory([]);
    }, [title]);

    
    useEffect(() => {
        const newValue = Object.values(data)[0];
        setHistory(prev => {
            const updated = [...prev, newValue];
            return updated.slice(-5);
        });
    }, [data]);

    const chartData = {
        labels: history.map((_, i) => `#${i + 1}`),
        datasets: [
            {
                label: title,
                data: history,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        animation: {
            duration: 300,
        },
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: title },
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 100,
            },
        },
    };

    return (
        <div className="graph-container">
            <div className="graph w-full h-64">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default Graph;
