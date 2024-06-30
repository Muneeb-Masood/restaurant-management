let responseData;
document.addEventListener('DOMContentLoaded', () => {
  
  fetch('http://localhost:8000/customers', {
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

          td1.innerHTML = data[i].Name;
          td2.innerHTML = data[i].Address;
          td3.innerHTML = data[i].ContactNo;
          td4.innerHTML = "<button>Delete</button>";
          td5.innerHTML = "<button>Update</button>";
          td6.innerHTML = data[i].ID;
          
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tr.appendChild(td6);

          td4.querySelector('button').addEventListener('click', () => {
              if (confirm("Are you sure you want to delete this customer?")) {
                  fetch(`http://localhost:8000/customers/${td6.innerHTML}`, {
                      method: 'DELETE',
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  })
                  .then(response => response.json())
                  .then(data => {
                      alert("Customer deleted successfully with id " + data);
                      tr.remove();
                  })
                  .catch(err => {
                      alert('Error in deleting the customer:', err);
                  });
              }
          });

          td5.querySelector('button').addEventListener('click', () => {
              let newName = prompt("Enter new name:", td1.innerHTML);
              let newAddress = prompt("Enter new address:", td2.innerHTML);
              let newContactNo = prompt("Enter new contact number:", td3.innerHTML);

              if (newName && newAddress && newContactNo) {
                  let updatedCustomer = {
                      Name: newName,
                      Address: newAddress,
                      ContactNo: newContactNo
                  };

                  fetch(`http://localhost:8000/customers/${td6.innerHTML}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(updatedCustomer)
                  })
                  .then(response => response.json())
                  .then(data => {
                      alert("Customer updated successfully");
                      td1.innerHTML = newName;
                      td2.innerHTML = newAddress;
                      td3.innerHTML = newContactNo;
                  })
                  .catch(err => {
                      alert('Error in updating the customer:', err);
                  });
              }
          });

          let tbody = document.getElementsByTagName("tbody");
          tbody[0].appendChild(tr);
      }
  })
  .catch(error => console.log('Error in fetching the data:', error));
});

let addCustomer = document.getElementById("addCustomer");
// console.log(responseData.length + " customers");
addCustomer.addEventListener('click', function(){
  console.log("Button press hoa ha add customer ka");
  let name = document.getElementById('customer-name').value;
  let address = document.getElementById('customer-address').value;
  let contactNo = document.getElementById('customer-contact').value;
  console.log(name, address, contactNo);
  fetch('http://localhost:8000/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, address, contactNo })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Length");
    alert("Customer added successfully");
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