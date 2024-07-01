


let responseData;
document.addEventListener('DOMContentLoaded', () => {
  
  // const customerForm = document.getElementById('customer-form');
  // const customerList = document.getElementById('customer-list');

  // customerForm.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     console.log("Button press hoa ha add customer ka");
  //     const name = document.getElementById('customer-name').value;
  //     const address = document.getElementById('customer-address').value;
  //     const contactNo = document.getElementById('customer-contact').value;

      fetch('http://localhost:8000/waiters', {
          method: 'GET',
         
        
      })
      .then(
        response => response.json())
       .then(data => {
        responseData = data;
        for(var i = 0 ; i < responseData.length; i++) {
  
          let tr =  document.createElement(
            'tr'
          );
          
          let td1 = document.createElement('td');
          
          let td2 = document.createElement('td');
          
          let td3 = document.createElement('td');
          let td4 = document.createElement('td');
          let td5 = document.createElement('td');
          let td6 = document.createElement('td');
          let td7 = document.createElement('td');
          let td8 = document.createElement('td');
          
          td1.innerHTML = data[i].Name;
          
          td2.innerHTML = 
          data[i].Role;
          
          td3.innerHTML = 
          data[i].Email;
          
          td4.innerHTML = data[i].Address;
          td5.innerHTML = data[i].Shift;
          td6.innerHTML =  "<button>Delete</button>";
          td7.innerHTML =  "<button>Update</button>";
          td8.innerHTML = data[i].ID;
          
          
          tr.appendChild(td1);
          
          tr.appendChild(td2);
          
          tr.appendChild(td3);
          
          tr.appendChild(td4);
          tr.appendChild(td5);
          tr.appendChild(td6);
          tr.appendChild(td7);
        
          td6.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete this Waiter?")) {
                fetch(`http://localhost:8000/waiters/${td8.innerHTML}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        alert('Waiter deleted successfully');
                        tr.remove();
                    } else {
                        alert('Error in deleting the Waiter');
                    }
                })
                .catch(err => {
                    console.error('Error deleting Waiter:', err);
                    alert('Error from Waiter.js:', err);
                });
            }
        });

        td7.addEventListener('click', () => {
          let newName = prompt("Enter new Name:", td1.innerHTML);
          let newRole = prompt("Enter new Role:", td2.innerHTML);
          let newEmail = prompt("Enter new Email:", td3.innerHTML);
          let newAddress = prompt("Enter new Address:", td4.innerHTML);
          let newShift = prompt("Enter new Shift:", td5.innerHTML);
      
          // Check if all inputs are provided
          if (newName !== null && newRole !== null && newEmail !== null && newAddress !== null  && newShift !== null) {
              let updatedWaiter = {
                  name: newName,
                  role: newRole,
                  email: newEmail,
                  address: newAddress,
                  shift: newShift
                  
              };
              console.log('Updated Waiter:', updatedWaiter);
      
      
              fetch(`http://localhost:8000/waiters/${td8.innerHTML}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedWaiter)
              })
              .then(response => {
                  if (response.ok) {
                      return response.json();
                  } else {
                      throw new Error('Failed to update Waiter record');
                  }
              })
              .then(data => {
                  // Update table cell values with updated data
                  td1.innerHTML = data.name;
                  td2.innerHTML = data.role;
                  td3.innerHTML = data.email;
                  td4.innerHTML = data.address;
                  td5.innerHTML = data.shift;
      
      
                  alert("Waiter updated successfully");
              })
              .catch(err => {
                  console.error('Error updating Waiter Record:', err);
                  alert('Error in updating the Waiter Record');
              });
          }
      });
      

        

          
          
          
          let tbody = document.getElementsByTagName("tbody");
          
          tbody[0].appendChild(tr);
          
          
        }
       }
        
      )
     
      .catch(error => console.log('Error ha bhayya in fetching the data:', error));
  });




  

let addWaiter = document.getElementById("addWaiter");
// console.log(responseData.length + " customers");
addWaiter.addEventListener('click', function(){
  console.log("Button press hoa ha add waiter ka");
  let name = document.getElementById('waiter-name').value;
  let role = document.getElementById('waiter-role').value;
  let email = document.getElementById('waiter-email').value;
  let address = document.getElementById('waiter-address').value;
  let shift = document.getElementById('waiter-shift').value;
  console.log(name);
  console.log(role);
  console.log(email);


  fetch('http://localhost:8000/waiters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, role, email  , address , shift})
  })
  .then(response => response.json())
  .then(data => {
    console.log("Length");
    alert("Waiter added successfully");
  })
  .catch(error => console.error('Error:', error))});





// let btn = document.getElementById("userAnchorTag");
// console.log(btn);
// console.log("Muneeb Bhaia");
// btn.addEventListener(
//   "click",
// ()=>{
//   window.location.href = "http://localhost:5500/src/customers/customers.html"
// }
// )