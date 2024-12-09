function initializeCharts() {
    const ctx = document.getElementById('energyChart').getContext('2d');
    const energyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Energy Consumption (kW)',
                data: [4.2, 3.8, 5.1, 6.5, 5.8, 4.9],
                borderColor: '#3949ab',
                backgroundColor: 'rgba(57, 73, 171, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeCharts); 