document.addEventListener('DOMContentLoaded', () => {
  const ratingFilter = document.getElementById('ratingFilter');
  let tbody = document.getElementsByTagName("tbody")[0];

  // Function to filter feedback based on rating
  function filterFeedback(data, rating) {
    return data.filter(item => {
      const matchesRating = rating === '' || item.rating.toString() === rating;
      return matchesRating;
    });
  }

  // Fetch feedback data and render it
  fetch('http://localhost:8000/feedback', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    responseData = data;
    renderFeedback(data);

    // Add event listener for rating filter
    ratingFilter.addEventListener('change', () => {
      const filteredData = filterFeedback(responseData, ratingFilter.value);
      renderFeedback(filteredData);
    });
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

      td1.innerHTML = data[i].customer_name;
      td2.innerHTML = data[i].feedback_text;
      td3.innerHTML = data[i].rating;
      td4.innerHTML = data[i].date_submitted;

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tbody.appendChild(tr);
    }
  }

  // Fetch and render feedback stats
  fetch('http://localhost:8000/feedback-stats')
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('feedbackChart').getContext('2d');
      const feedbackChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Positive', 'Negative'],
          datasets: [{
            data: [data.positive_feedback, data.negative_feedback],
            backgroundColor: ['#66b3ff', '#ff9999'],
            hoverBackgroundColor: ['#4da3ff', '#ff8080']
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Feedback Distribution'
          }
        }
      });
    })
    .catch(error => console.error('Error fetching feedback stats:', error));

  // Add event listener for navigating to the customer page
  let btn = document.getElementById("userAnchorTag");
  btn.addEventListener("click", () => {
    window.location.href = "http://localhost:5500/src/customers/customers.html";
  });
});
