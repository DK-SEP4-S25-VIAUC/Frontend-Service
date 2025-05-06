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
        // Konverter objekt til ét tal (f.eks. moisture)
        const value = Object.values(data)[0];

        setHistory(prev => {
            const updated = [...prev, value];
            // Hvis der er mere end 5, fjern det første
            if (updated.length > 5) updated.shift();
            return updated;
        });
    }, [data]);

    const chartData = {
        labels: history.map((_, i) => `#${i + 1}`), // f.eks. #1, #2, ...
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
    };

    return (
        <div className="graph-container">
            <div className="graph">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default Graph;
