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
    btn6.classList.add("active");
    btn7.classList.remove("active");
    btn8.classList.remove("active");
    dashboard.classList.remove("active");
  
    fetch('http://localhost:8000/daily-sales', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log("Fetched Data:", data); // Log the fetched data to check its structure
        responseData = data;
        for (let i = 0; i < responseData.length; i++) {
            let tr = document.createElement('tr');
            
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            // let td3 = document.createElement('td');
            // let td4 = document.createElement('td');
            // let td5 = document.createElement('td');
            // let td6 = document.createElement('td');
  
            td1.innerHTML = responseData[i].sale_date; // Adjusted for both possible cases
            td2.innerHTML = responseData[i].daily_sales; // Adjusted for both possible cases
            // td3.innerHTML = responseData[i].ContactNo || responseData[i].contactNo; // Adjusted for both possible cases
            // td4.innerHTML = "<button>Delete</button>";
            // td5.innerHTML = "<button>Update</button>";
            // td6.innerHTML = responseData[i].ID || responseData[i].id; 
            // Adjusted for both possible cases
            
            // tr.appendChild(td6);
            tr.appendChild(td2);
            tr.appendChild(td1);
            // tr.appendChild(td3);
            // tr.appendChild(td4);
            // tr.appendChild(td5);
  
        
  
            let tbody = document.getElementsByTagName("tbody");
            tbody[0].appendChild(tr);
        }
    })
    .catch(error => console.log('Error in fetching the data:', error));
  });
  
 