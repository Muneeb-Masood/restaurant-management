// let btn = document.getElementById("orderAnchorTag");
// console.log(btn);
// console.log("Muneeb Bhaia");
// btn.addEventListener(
//     "click",
//   ()=>{
//     window.location.href = "http://localhost:5500/src/customers/customers.html"
//   }
// )
const locationCounts = {};
document.addEventListener('DOMContentLoaded', () => {
 
  let tbody = document.getElementsByTagName("tbody")[0];

  

  // Fetch feedback data and render it
  fetch('http://localhost:8000/order', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    responseData = data;
    renderFeedback(data);

    // Add event listener for rating filter
   
  })
  .catch(error => console.log('Error fetching the data:', error));

  // Function to render feedback data
  function renderFeedback(data) {
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

      if (locationCounts[data[i].Location]) {
        locationCounts[data[i].Location]++;
    } else {
        locationCounts[data[i].Location] = 1;
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
    createPieChart(locationCounts);
  }

  // Fetch and render feedback stats
  

  // Add event listener for navigating to the customer page
  let btn = document.getElementById("userAnchorTag");
  btn.addEventListener("click", () => {
    window.location.href = "http://localhost:5500/src/customers/customers.html";
  });
});


function createPieChart(locationCounts) {
  const ctx = document.getElementById('orderChart').getContext('2d');
  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: Object.keys(locationCounts),
          datasets: [{
              data: Object.values(locationCounts),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }]
      },
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Orders by Location'
          }
      }
  });
}
