document.addEventListener('DOMContentLoaded', function() {
    // Fetch sales data from the backend
    fetch('http://localhost:8000/sales-data')
        .then(response => response.json())
        .then(data => {
            updateSalesData(data.dailySales, data.monthlySales);
            renderCharts(data.dailySales, data.monthlySales);
        })
        .catch(error => console.error('Error fetching sales data:', error));
});

function updateSalesData(dailySales, monthlySales) {
    const totalDailySales = dailySales.reduce((sum, sale) => sum + sale.daily_sales, 0);
    const totalMonthlySales = monthlySales.reduce((sum, sale) => sum + sale.monthly_sales, 0);

    document.getElementById('dailySalesValue').innerText = totalDailySales.toFixed(2);
    document.getElementById('monthlySalesValue').innerText = totalMonthlySales.toFixed(2);
}

function renderCharts(dailySales, monthlySales) {
    const dailySalesCtx = document.getElementById('dailySalesChart').getContext('2d');
    new Chart(dailySalesCtx, {
        type: 'bar',
        data: {
            labels: dailySales.map(sale => sale.sale_date),
            datasets: [{
                label: 'Daily Sales',
                data: dailySales.map(sale => sale.daily_sales),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const monthlySalesCtx = document.getElementById('monthlySalesChart').getContext('2d');
    new Chart(monthlySalesCtx, {
        type: 'line',
        data: {
            labels: monthlySales.map(sale => sale.sale_month),
            datasets: [{
                label: 'Monthly Sales',
                data: monthlySales.map(sale => sale.monthly_sales),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
