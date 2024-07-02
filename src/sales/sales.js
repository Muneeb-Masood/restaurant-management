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

        // Populate the table
        for (let i = 0; i < responseData.length; i++) {
            let tr = document.createElement('tr');
            
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
  
            td1.innerHTML = responseData[i].sale_date;
            td2.innerHTML = responseData[i].daily_sales;
            
            tr.appendChild(td2);
            tr.appendChild(td1);
  
            let tbody = document.getElementsByTagName("tbody");
            tbody[0].appendChild(tr);
        }

        // Prepare data for the bar chart
        let labels = responseData.map(item => item.sale_date);
        let dataValues = responseData.map(item => item.daily_sales);

        // Create the bar chart
        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Sales',
                    data: dataValues,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.raw !== null) {
                                    label += context.raw + ' sales';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.log('Error in fetching the data:', error));
});
