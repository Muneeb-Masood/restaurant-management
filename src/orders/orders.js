const locationCounts = {};
const orderCounts = {
  Delivered: 0,
  Pending: 0,
};

document.addEventListener('DOMContentLoaded', () => {

  let dashboard = document.getElementById("Dashboard");
  let btn = document.getElementById("userAnchorTag");
  let btn1 = document.getElementById("chefAnchorTag");
  let btn2 = document.getElementById("waiterAnchorTag");
  let btn3 = document.getElementById("feedbackAnchorTag");
  let btn4 = document.getElementById("managerAnchorTag");
  let btn5 = document.getElementById("orderAnchorTag");
  let btn6 = document.getElementById("saleAnchorTag");
  let btn7 = document.getElementById("billAnchorTag");
  let btn8 = document.getElementById("menuAnchorTag");

  btn.classList.remove("active");
  btn1.classList.remove("active");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
  btn4.classList.remove("active");
  btn5.classList.add("active");
  btn6.classList.remove("active");
  btn7.classList.remove("active");
  btn8.classList.remove("active");
  dashboard.classList.remove("active");
  document.getElementById('search-btn').addEventListener('click', searchOrder);
  function searchOrder() {
    let searchId = document.getElementById('search-order-id').value;
    if (searchId) {
      fetch(`http://localhost:8000/order/${searchId}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data1 => {
        console.log(data1.length);
        if (data1.length > 0) {

            renderData(data1);

            } else {
          alert('No Order found with the provided ID');
        }
      })
      .catch(error => console.log('Error in searching the Order:', error));
    } else {
      alert('Please enter a Order ID to search');
    }
  }
  let tbody = document.getElementsByTagName("tbody")[0];

  // Fetch order data and render it
  fetch('http://localhost:8000/order', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    responseData = data;
    renderData(data);
    renderOrders(data);
    calculateStats(data);
  })
  .catch(error => console.log('Error fetching the data:', error));

  // Function to render order data
  function renderOrders(data) {
    // tbody.innerHTML = ''; // Clear existing rows
   
    // createPieChart(locationCounts, 'orderChart');
    createPieChart(orderCounts, 'paymentChart');
  }

  // Function to calculate overall stats
  function calculateStats(data) {
    let totalOrders = data.length;
    let deliveredOrders = data.filter(order => order.OrderStatus === 'Delivered').length;
    let pendingOrders = totalOrders - deliveredOrders;
   
    displayStats(totalOrders, deliveredOrders, pendingOrders);
  }

  // Function to display overall stats
  function displayStats(totalOrders, deliveredOrders, pendingOrders) {
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = `
      <h2>Overall Stats</h2>
      <p>Total Orders: ${totalOrders}</p>
      <p>Delivered Orders: ${deliveredOrders}</p>
      <p>Pending Orders: ${pendingOrders}</p>
     
    `;
  }
  function renderData(data){
    tbody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let td4 = document.createElement('td');
      let td5 = document.createElement('td');
      let td6 = document.createElement('td');
      let td7 = document.createElement('td');
      let td8 = document.createElement('td');
      let td9 = document.createElement('td');
  
      td1.innerHTML = data[i].OrderNo;
      td2.innerHTML = data[i].CustomerID;
      td3.innerHTML = data[i].BillID;
      td4.innerHTML = data[i].WaiterID;
      td5.innerHTML = data[i].FeedbackID;
      td6.innerHTML = data[i].OrderStatus;
      td7.innerHTML = data[i].OrderDate;
      td8.innerHTML = "<button>Delete</button>";
      td9.innerHTML = "<button>Update</button>";

  
      // Counting orders by location for pie chart
      // if (locationCounts[data[i].Location]) {
      //   locationCounts[data[i].Location]++;
      // } else {
      //   locationCounts[data[i].Location] = 1;
      // }
  
      // Counting payment statuses for pie chart
      if (data[i].OrderStatus in orderCounts) {
        orderCounts[data[i].OrderStatus]++;
      }
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
      tr.appendChild(td8);
      tr.appendChild(td9);
  
      td8.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this Order?")) {
            fetch(`http://localhost:8000/order/${td1.innerHTML}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Order deleted successfully');
                    tr.remove();
                } else {
                    alert('Error in deleting the Order');
                }
            })
            .catch(err => {
                console.error('Error deleting Order:', err);
                alert('Error from Order.js:', err);
            });
        }
    });

    td9.addEventListener('click', () => {
      let newCId = prompt("Enter new Customer ID:", td2.innerHTML);
      let newBId = prompt("Enter new Bill ID:", td3.innerHTML);
      let newWId = prompt("Enter new Waiter ID:", td4.innerHTML);
      let newFId = prompt("Enter new Feedback ID:", td5.innerHTML);
      let newOStatus = prompt("Enter new Order Status:", td6.innerHTML);

      // Check if all inputs are provided
      if (newCId !== null && newBId !== null && newWId !== null && newFId !== null && newOStatus !== null) {
          let updatedOrder = {
            customerId : newCId,
            billId : newBId,
            waiterId : newWId,
            feedbackId : newFId,
            orderStatus : newOStatus,
             
          };

          console.log('Updated Order:', updatedOrder);

          fetch(`http://localhost:8000/order/${td1.innerHTML}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedOrder)
          })
          .then(response => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error('Failed to update Order ');
              }
          })
          .then(data => {
            console.log(data);
              // Update table cell values with updated data
              // td1.innerHTML = data.OrderNo;
              td2.innerHTML = data.customerId;
              td3.innerHTML = data.billId;
              td4.innerHTML = data.waiterId;
              td5.innerHTML = data.feedbackId;
              td6.innerHTML = data.orderStatus;

              alert("Order updated successfully");
          })
          .catch(err => {
              console.error('Error updating Order:', err);
              alert('Error in updating the Order: ' + err.message);
          });
      }
  });


      tbody.appendChild(tr);
    }
  
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
  let billID = document.getElementById('bill-id').value;
  let waiterID = document.getElementById('waiter-id').value;
  let feedbackID = document.getElementById('feedback-id').value;
  let orderStatus = document.getElementById('order-status').value;
  fetch('http://localhost:8000/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({customerID , billID , waiterID , feedbackID, orderStatus})
  })
  .then(response =>     {
    console.log(response);
    if(response == true){
      alert("Order added successfully")
    }
    else{
      alert("Error in adding order")
    }
  }
)
  
  .catch(error => {
    alert("This Customer is new so first add Customers Details");
    window.location.href = "http://localhost:5501/src/customers/customers.html"
  })});


 