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
  
    btn.classList.add("active");
    btn1.classList.remove("active");
    btn2.classList.remove("active");
    btn3.classList.remove("active");
    btn4.classList.remove("active");
    btn5.classList.remove("active");
    btn6.classList.remove("active");
    btn7.classList.remove("active");
    btn8.classList.remove("active");
    dashboard.classList.remove("active");
  
    fetchCustomers();
  
    document.getElementById('search-btn').addEventListener('click', searchCustomer);
  
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
        fetchCustomers();
      })
      .catch(error => console.error('Error:', error));
    });
  });
  
  function fetchCustomers() {
    fetch('http://localhost:8000/customers', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      console.log("Fetched Data:", data);
      populateCustomerTable(data);
    })
    .catch(error => console.log('Error in fetching the data:', error));
  }
  
  function populateCustomerTable(customers) {
    let tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // Clear existing rows
    customers.forEach(customer => {
      let tr = document.createElement('tr');
      
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let td4 = document.createElement('td');
      let td5 = document.createElement('td');
      let td6 = document.createElement('td');
  
      td1.innerHTML = customer.ID || customer.id;
      td2.innerHTML = customer.Name || customer.name;
      td3.innerHTML = customer.Address || customer.address;
      td4.innerHTML = customer.ContactNo || customer.contactNo;
      td5.innerHTML = "<button>Delete</button>";
      td6.innerHTML = "<button>Update</button>";
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
  
      td5.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this Customer?")) {
          fetch(`http://localhost:8000/customers/${td1.innerHTML}`, {
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
          .catch(error => console.log('Error in deleting the Customer:', error));
        }
      });

      td6.addEventListener('click', () => {
        let newName = prompt("Enter new Name:", td2.innerHTML);
        let newAddress = prompt("Enter new Address:", td3.innerHTML);
        let newContactNumber = prompt("Enter new Contact Number:", td4.innerHTML);
    
        // Check if all inputs are provided
        if (newName !== null &&  newAddress !== null && newContactNumber !== null ) {
            let updatedCustomer = {
                name: newName,
                
                address: newAddress,
                contactNo: newContactNumber,
                
            };
            console.log('Updated Customer:', updatedCustomer);
    
    
            fetch(`http://localhost:8000/customers/${td1.innerHTML}`, {
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
                    throw new Error('Failed to update Manager record');
                }
            })
            .then(data => {
                console.log(data);
                // Update table cell values with updated data
                td2.innerHTML = data.name;
                td3.innerHTML = data.address;
                td4.innerHTML = data.contactNo;
               
    
    
                alert("Customer updated successfully");
            })
            .catch(err => {
                console.error('Error updating Customer Record:', err);
                alert('Error in updating the Customer Record');
            });
        }
    });

  
      tbody.appendChild(tr);
    });
  }
  
  function searchCustomer() {
    let searchId = document.getElementById('search-customer-id').value;
    if (searchId) {
      fetch(`http://localhost:8000/customers/${searchId}`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.length > 0) {
          populateCustomerTable(data);
        } else {
          alert('No customer found with the provided ID');
        }
      })
      .catch(error => console.log('Error in searching the customer:', error));
    } else {
      alert('Please enter a customer ID to search');
    }
  }
  