


document.addEventListener('DOMContentLoaded', () => {

  let responseData;

  // Function to fetch and render chefs
  function fetchAndRenderChefs() {
      fetch('http://localhost:8000/chefs')
          .then(response => response.json())
          .then(data => {
              responseData = data;
              renderChefs(data);
          })
          .catch(error => console.error('Error fetching chefs:', error));
  }

  // Function to render chefs in table
  function renderChefs(chefs) {
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = ''; // Clear previous rows
      chefs.forEach(chef => {
          const tr = document.createElement('tr');
        let td1 = document.createElement('td');
          let td2 = document.createElement('td');
          let td3 = document.createElement('td');
          let td4 = document.createElement('td');
          let td5 = document.createElement('td');
          let td6 = document.createElement('td');

       

          td1.innerHTML = chef.Name;
          td2.innerHTML = chef.Role;
          td3.innerHTML = chef.Email;
          td4.innerHTML = "<button>Delete</button>";
          td5.innerHTML = "<button>Update</button>";
          td6.innerHTML = chef.ID;

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tbody.appendChild(tr);

          // Attach event listener for delete button
          td4.addEventListener('click', () => {
              deleteChef(chef.ID);
          });

          // Attach event listener for update button
          td5.addEventListener('click', () => {
              updateChef(chef);
          });
      });
  }

  // Function to handle delete chef
  function deleteChef(chefID) {
      fetch(`http://localhost:8000/chefs/${chefID}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to delete chef');
          }
          return response.json();
      })
      .then(data => {
          alert('Chef deleted successfully');
          fetchAndRenderChefs(); // Refresh chefs after deletion
      })
      .catch(error => {
          console.error('Error deleting chef:', error);
          alert('Error deleting chef');
      });
  }

  // Function to handle update chef
  function updateChef(chef) {
      const newName = prompt("Enter new name:", chef.Name);
      const newRole = prompt("Enter new role:", chef.Role);
      const newEmail = prompt("Enter new email:", chef.Email);

      if (newName !== null && newRole !== null && newEmail !== null) {
          const updatedChef = {
              Name: newName,
              Role: newRole,
              Email: newEmail
          };

          fetch(`http://localhost:8000/chefs/${chef.ID}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedChef)
          })
          .then(response => response.json() )
          .then(data => {
            alert("Chef updated successfully");
            td1.innerHTML = newName;
            td2.innerHTML = newRole;
            td3.innerHTML = newEmail;
            fetchAndRenderChefs();
        })
         
          
      }
  }

  // Initial fetch and render on page load
  fetchAndRenderChefs();
});


let addChef = document.getElementById("addChef");
addChef.addEventListener('click', function(){
  console.log("Button press hoa ha add Chef ka");
  let name = document.getElementById('chef-name').value;
  let role = document.getElementById('chef-role').value;
  let email = document.getElementById('chef-email').value;
  console.log(name);
  console.log(role);
  console.log(email);


  fetch('http://localhost:8000/chefs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, role, email })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Length");
    alert("Chef added successfully");
  })
  .catch(error => console.error('Error:', error))});





// let btn = document.getElementById("userAnchorTag");
// console.log(btn);
// console.log("Muneeb Bhaia");
// btn.addEventListener(
//   "click",
// ()=>{
//   window.location.href = "http://localhost:5500/src/chefs/chefs.html"
// }
// )