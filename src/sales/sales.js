// Mock data for demonstration purposes
const salesData = {
    totalSales: 1000,
    totalTransactions: 50,
    avgTransactionValue: 20,
    categorySales: {
        food: 600,
        beverages: 400,
    },
    topItems: [
        { name: 'Item A', sales: 200 },
        { name: 'Item B', sales: 180 },
        { name: 'Item C', sales: 150 },
        { name: 'Item D', sales: 100 },
        { name: 'Item E', sales: 80 },
    ],
    salesTrends: [100, 150, 200, 250, 300, 400, 600],
};

document.getElementById('total-sales').innerText = salesData.totalSales.toFixed(2);
document.getElementById('total-transactions').innerText = salesData.totalTransactions;
document.getElementById('avg-transaction-value').innerText = salesData.avgTransactionValue.toFixed(2);
document.getElementById('food-sales').innerText = salesData.categorySales.food.toFixed(2);
document.getElementById('beverage-sales').innerText = salesData.categorySales.beverages.toFixed(2);

const topItemsList = document.getElementById('top-items');
salesData.topItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerText = `${item.name} - $${item.sales.toFixed(2)}`;
    topItemsList.appendChild(listItem);
});

// Chart.js code for sales trends
const ctxSalesTrends = document.getElementById('sales-trends-chart').getContext('2d');
const salesTrendsChart = new Chart(ctxSalesTrends, {
    type: 'line',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'],
        datasets: [{
            label: 'Sales Trends',
            data: salesData.salesTrends,
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

// Chart.js code for top-selling items
const ctxTopItems = document.getElementById('top-items-chart').getContext('2d');
const topItemsChart = new Chart(ctxTopItems, {
    type: 'bar',
    data: {
        labels: salesData.topItems.map(item => item.name),
        datasets: [{
            label: 'Top-Selling Items',
            data: salesData.topItems.map(item => item.sales),
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

// Export functionality
document.getElementById('export-btn').addEventListener('click', () => {
    const csvContent = `data:text/csv;charset=utf-8,Total Sales,${salesData.totalSales}\nTotal Transactions,${salesData.totalTransactions}\nAverage Transaction Value,${salesData.avgTransactionValue}\nFood Sales,${salesData.categorySales.food}\nBeverage Sales,${salesData.categorySales.beverages}\n\nTop-Selling Items\nItem,Sales\n${salesData.topItems.map(item => `${item.name},${item.sales}`).join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sales_data.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
});
