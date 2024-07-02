let responseData;
document.addEventListener('DOMContentLoaded', () => {
  
  fetch('http://localhost:8000/managers', {
      method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
      responseData = data;
      for (var i = 0; i < responseData.length; i++) {

          let tr = document.createElement('tr');
          
          let td1 = document.createElement('td');
          let td2 = document.createElement('td');
          let td3 = document.createElement('td');
          let td4 = document.createElement('td');
          let td5 = document.createElement('td');
          let td6 = document.createElement('td');
          let td7 = document.createElement('td');
          let td8 = document.createElement('td');

          td1.innerHTML = data[i].Name;
          td2.innerHTML = data[i].Email;
          td3.innerHTML = data[i].Address;
          td4.innerHTML = "<button>Delete</button>";
          td5.innerHTML = "<button>Update</button>";
          td6.innerHTML = data[i].ManagerID;
          td7.innerHTML = data[i].ContactNumber;
          td8.innerHTML = data[i].Department;
          
          tr.appendChild(td6);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td7);
          tr.appendChild(td8);
          tr.appendChild(td4);
          tr.appendChild(td5);

          td4.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete this Manager?")) {
                fetch(`http://localhost:8000/managers/${td6.innerHTML}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        alert('Manager deleted successfully');
                        tr.remove();
                    } else {
                        alert('Error in deleting the Manager');
                    }
                })
                .catch(err => {
                    console.error('Error deleting Manager:', err);
                    alert('Error from Manager.js:', err);
                });
            }
        });

        td5.addEventListener('click', () => {
            let newName = prompt("Enter new Name:", td1.innerHTML);
            let newEmail = prompt("Enter new Email:", td2.innerHTML);
            let newAddress = prompt("Enter new Address:", td3.innerHTML);
            let newContactNumber = prompt("Enter new Contact Number:", td7.innerHTML);
            let newDepartment = prompt("Enter new Department:", td8.innerHTML);
        
            // Check if all inputs are provided
            if (newName !== null && newEmail !== null && newAddress !== null && newContactNumber !== null  && newDepartment !== null) {
                let updatedManager = {
                    name: newName,
                    email: newEmail,
                    address: newAddress,
                    contactNo: newContactNumber,
                    department: newDepartment
                    
                };
                console.log('Updated Manager:', updatedManager);
        
        
                fetch(`http://localhost:8000/managers/${td6.innerHTML}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedManager)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to update Manager record');
                    }
                })
                .then(data => {
                    console.log(data);
                    // Update table cell values with updated data
                    td1.innerHTML = data.name;
                    td2.innerHTML = data.email;
                    td3.innerHTML = data.address;
                    td7.innerHTML = data.contactNo;
                    td8.innerHTML = data.department;
        
        
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
  })
  .catch(error => console.log('Error in fetching the data:', error));
});





let addManager = document.getElementById("addManager");
// console.log(responseData.length + " customers");
addManager.addEventListener('click', function(){
  console.log("Button press hoa ha  addManager ka");
  let name = document.getElementById('manager-name').value;
  let address = document.getElementById('manager-address').value;
  let email = document.getElementById('manager-email').value;
  let contactNo = document.getElementById('manager-contact').value;
  let department = document.getElementById('manager-department').value;
//   console.log(name, address, contactNo);
  fetch('http://localhost:8000/managers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, address, contactNo , email , department
     })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Length");
    alert("Manager added successfully");
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