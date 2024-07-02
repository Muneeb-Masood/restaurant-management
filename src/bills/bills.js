// const billCounts = {};
const billCounts = {
  Paid: 0,
  Unpaid: 0,
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
    btn5.classList.remove("active");
    btn6.classList.remove("active");
    btn7.classList.add("active");
    btn8.classList.remove("active");
    dashboard.classList.remove("active");

  
  let tbody = document.getElementsByTagName("tbody")[0];

  // Fetch order data and render it
  fetch('http://localhost:8000/bills', {
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
   

      td1.innerHTML = data[i].BillNo;
      td2.innerHTML = data[i].Price;
      td3.innerHTML = data[i].Status;
      td4.innerHTML = data[i].BillDate;
      td5.innerHTML = "<button>Delete</button>";
      td6.innerHTML = "<button>Update</button>";

      td5.querySelector('button').addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this Bill?")) {
            fetch(`http://localhost:8000/bills/${td1.innerHTML}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                alert("Bill deleted successfully with id " + data);
                tr.remove();
            })
            .catch(err => {
                alert('Error in deleting the Bill:', err);
            });
        }
    });

    td6.querySelector('button').addEventListener('click', () => {
        let newPrice = prompt("Enter new price:", td2.innerHTML);
        let newStatus = prompt("Enter new status:", td3.innerHTML);
       

        if (newPrice && newStatus) {
            let updatedBill = {
                price : newPrice.value,
                status : newStatus.value,
            };

            fetch(`http://localhost:8000/bills/${td1.innerHTML}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBill)
            })
            .then(response => response.json())
            .then(data => {
                alert("Bill updated successfully");
           
                td2.innerHTML = data.billPrice.value;;
                td3.innerHTML = data.billStatus.value;
            })
            .catch(err => {
                alert('Error in updating the Bills:', err);
            });
        }
    });




      // Counting orders by location for pie chart
      // if (locationCounts[data[i].Location]) {
      //   locationCounts[data[i].Location]++;
      // } else {
      //   locationCounts[data[i].Location] = 1;
      // }

      // Counting payment statuses for pie chart
      if (data[i].Status in billCounts) {
        billCounts[data[i].Status]++;
      }

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
    //   tr.appendChild(td7);

      tbody.appendChild(tr);
    }

    // createPieChart(locationCounts, 'orderChart');
    createPieChart(billCounts, 'paymentChart');
  }

  // Function to calculate overall stats
  function calculateStats(data) {
    let totalBills = data.length;
    let UnpaidBills = data.filter(bill => bill.Status === 'Unpaid').length;
    // let pendingOrders = totalOrders - deliveredOrders;
   
    displayStats(totalBills, UnpaidBills);
  }

  // Function to display overall stats
  function displayStats(totalBills,  UnpaidBills) {
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = `
      <h2>Overall Stats</h2>
      <p>Total Bills: ${totalBills}</p>
      <p>Unpaid Bills: ${UnpaidBills}</p>

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
          text:  'Bill Status',
        }
      }
    });
  }
});


let addBill = document.getElementById("addBill");
// console.log(responseData.length + " customers");
addBill.addEventListener('click', function(){
  console.log("Button press hoa ha  addBill ka");
  let billPrice = document.getElementById('bill-price').value;
  let billStatus = document.getElementById('bill-status').value;
  fetch('http://localhost:8000/bills',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ billPrice , billStatus})
  })
  .then(response =>     {
    console.log(response);
    if(response == true){
      alert("Bill added successfully")
    }
    else{
      alert("Error in adding Bill")
    }
  }
)
  
  .catch(error => {
    alert("This Customer is new so first add Customers Details");
    // window.location.href = "http://localhost:5501/src/customers/customers.html"
  })});
