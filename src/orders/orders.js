const locationCounts = {};
const paymentCounts = {
  Paid: 0,
  Pending: 0,
};

document.addEventListener('DOMContentLoaded', () => {
  let tbody = document.getElementsByTagName("tbody")[0];

  // Fetch order data and render it
  fetch('http://localhost:8000/order', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    responseData = data;
    renderOrders(data);
    calculateStats(data);
  })
  .catch(error => console.log('Error fetching the data:', error));

  // Function to render order data
  function renderOrders(data) {
    tbody.innerHTML = ''; // Clear existing rows
    for (let i = 0; i < data.length; i++) {
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let td4 = document.createElement('td');
      let td5 = document.createElement('td');
      let td6 = document.createElement('td');
      let td7 = document.createElement('td');

      td1.innerHTML = data[i].OrderNo;
      td2.innerHTML = data[i].CustomerID;
      td3.innerHTML = data[i].OrderStatus;
      td4.innerHTML = data[i].PaymentStatus;
      td5.innerHTML = data[i].OrderDate;
      td6.innerHTML = data[i].Price;
      td7.innerHTML = data[i].Location;

      // Counting orders by location for pie chart
      if (locationCounts[data[i].Location]) {
        locationCounts[data[i].Location]++;
      } else {
        locationCounts[data[i].Location] = 1;
      }

      // Counting payment statuses for pie chart
      if (data[i].PaymentStatus in paymentCounts) {
        paymentCounts[data[i].PaymentStatus]++;
      }

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);

      tbody.appendChild(tr);
    }

    createPieChart(locationCounts, 'orderChart');
    createPieChart(paymentCounts, 'paymentChart');
  }

  // Function to calculate overall stats
  function calculateStats(data) {
    let totalOrders = data.length;
    let deliveredOrders = data.filter(order => order.OrderStatus === 'Delivered').length;
    let pendingOrders = totalOrders - deliveredOrders;
    let totalPayments = data.reduce((total, order) => total + parseFloat(order.Price), 0);
    let receivedPayments = data.filter(order => order.PaymentStatus === 'Paid')
                                .reduce((total, order) => total + parseFloat(order.Price), 0);
    let pendingPayments = totalPayments - receivedPayments;

    displayStats(totalOrders, deliveredOrders, pendingOrders, totalPayments, receivedPayments, pendingPayments);
  }

  // Function to display overall stats
  function displayStats(totalOrders, deliveredOrders, pendingOrders, totalPayments, receivedPayments, pendingPayments) {
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = `
      <h2>Overall Stats</h2>
      <p>Total Orders: ${totalOrders}</p>
      <p>Delivered Orders: ${deliveredOrders}</p>
      <p>Pending Orders: ${pendingOrders}</p>
      <p>Total Payments: $${totalPayments.toFixed(2)}</p>
      <p>Received Payments: $${receivedPayments.toFixed(2)}</p>
      <p>Pending Payments: $${pendingPayments.toFixed(2)}</p>
    `;
  }

  // Function to create a pie chart
  function createPieChart(dataCounts, chartId) {
    const ctx = document.getElementById(chartId).getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(dataCounts),
        datasets: [{
          data: Object.values(dataCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: chartId === 'orderChart' ? 'Orders by Location' : 'Payment Status',
        }
      }
    });
  }
});


let addOrder = document.getElementById("addOrder");
// console.log(responseData.length + " customers");
addOrder.addEventListener('click', function(){
  console.log("Button press hoa ha  addOrder ka");
  let customerID = document.getElementById('customer-id').value;
  let orderStatus = document.getElementById('order-status').value;
  let paymentStatus = document.getElementById('payment-status').value;
  let price = document.getElementById('price').value;
  let location = document.getElementById('location').value;
  fetch('http://localhost:8000/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({customerID , orderStatus , paymentStatus , price , location })
  })
  .then(response => response.json())
  .then(data => {
 
    alert("Order added successfully");
  })
  .catch(error => {
    alert("This Customer is new so first add Customers Details");
    window.location.href = "http://localhost:5501/src/customers/customers.html"
  })});
