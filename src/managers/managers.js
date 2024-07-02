let responseData;
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
    btn4.classList.add("active");
    btn5.classList.remove("active");
    btn6.classList.remove("active");
    btn7.classList.remove("active");
    btn8.classList.remove("active");
    dashboard.classList.remove("active");
  
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
          let td9 = document.createElement('td');

          td1.innerHTML = data[i].Name;
          td2.innerHTML = data[i].Email;
          td3.innerHTML = data[i].Address;
          td4.innerHTML = "<button>Delete</button>";
          td5.innerHTML = "<button>Update</button>";
          td6.innerHTML = data[i].ManagerID;
          td7.innerHTML = data[i].ContactNumber;
          td8.innerHTML = data[i].Department;
          td9.innerHTML = data[i].Password;
          
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
            let newPassword = prompt("Enter new Password:", td9.innerHTML);
            let newAddress = prompt("Enter new Address:", td3.innerHTML);
            let newContactNumber = prompt("Enter new Contact Number:", td7.innerHTML);
            let newDepartment = prompt("Enter new Department:", td8.innerHTML);
        
            // Check if all inputs are provided
            if (newName !== null && newEmail !== null && newPassword != null && newAddress !== null && newContactNumber !== null  && newDepartment !== null) {
                let updatedManager = {
                    name: newName,
                    email: newEmail,
                    password:  newPassword,
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
                    td9.innerHTML = data.password;
        
        
                    alert("Manager updated successfully");
                })
                .catch(err => {
                    console.error('Error updating Manager Record:', err);
                    alert('Error in updating the Manager Record');
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
  let password = document.getElementById('manager-password').value;
//   console.log(name, address, contactNo);
  fetch('http://localhost:8000/managers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, address, contactNo , email , department , password
     })
  })
  .then(response => response.json())
  .then(data => {
      alert(data["message"]);
    
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