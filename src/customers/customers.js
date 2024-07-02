document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8000/customers', {
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
          let td3 = document.createElement('td');
          let td4 = document.createElement('td');
          let td5 = document.createElement('td');
          let td6 = document.createElement('td');

          td1.innerHTML = responseData[i].Name || responseData[i].name; // Adjusted for both possible cases
          td2.innerHTML = responseData[i].Address || responseData[i].address; // Adjusted for both possible cases
          td3.innerHTML = responseData[i].ContactNo || responseData[i].contactNo; // Adjusted for both possible cases
          td4.innerHTML = "<button>Delete</button>";
          td5.innerHTML = "<button>Update</button>";
          td6.innerHTML = responseData[i].ID || responseData[i].id; // Adjusted for both possible cases
          
          tr.appendChild(td6);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);

          td4.addEventListener('click', () => {
            if (confirm("Are you sure you want to delete this Customer?")) {
                fetch(`http://localhost:8000/customers/${td6.innerHTML}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        alert('Customer deleted successfully');
                        tr.remove();
                    } else {
                        alert('Error in deleting the Customer');
                    }
                })
                .catch(err => {
                    console.error('Error deleting Customer:', err);
                    alert('Error from Customer.js:', err);
                });
            }
          });

          td5.addEventListener('click', () => {
            let newName = prompt("Enter new Name:", td1.innerHTML);
            let newAddress = prompt("Enter new Address:", td2.innerHTML);
            let newContactNumber = prompt("Enter new Contact Number:", td3.innerHTML);
      
            if (newName !== null && newAddress != null && newContactNumber !=null) {
                let updatedCustomer = {
                    name: newName,
                    address: newAddress,
                    contactNo: newContactNumber
                };
                console.log('Updated Customer:', updatedCustomer);
        
                fetch(`http://localhost:8000/customers/${td6.innerHTML}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedCustomer)
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to update Customer record');
                    }
                })
                .then(data => {
                    td1.innerHTML = data.name;
                    td2.innerHTML = data.address;
                    td3.innerHTML = data.contactNo;
                    alert("Customer updated successfully");
                })
                .catch(err => {
                    console.error('Error updating Customer Record:', err);
                    alert('Error in updating the Customer Record');
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
addCustomer.addEventListener('click', function(){
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
    alert("Customer added successfully");
  })
  .catch(error => console.error('Error:', error));
});
