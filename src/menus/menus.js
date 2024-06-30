let responseData;
document.addEventListener('DOMContentLoaded', () => {

  fetch('http://localhost:8000/menus', {
      method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
      for (let i = 0; i < data.length; i++) {
          let tr = document.createElement('tr');
          let td1 = document.createElement('td');
          let td2 = document.createElement('td');
          let td3 = document.createElement('td');
          let td4 = document.createElement('td');
          let td5 = document.createElement('td');
          let td6 = document.createElement('td');
          let td7 = document.createElement('td');

          td1.innerHTML = data[i].Name;
          td2.innerHTML = data[i].Description;
          td3.innerHTML = data[i].Price;
          td4.innerHTML = "<button>Delete</button>";
          td5.innerHTML = "<button>Update</button>";
          td6.innerHTML = data[i].ItemID;
          td7.innerHTML = data[i].Category;

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td7);
          tr.appendChild(td4);
          tr.appendChild(td5);

          // Delete button click handler
          td4.querySelector('button').addEventListener('click', () => {
              if (confirm("Are you sure you want to delete this Menu?")) {
                  fetch(`http://localhost:8000/menus/${td6.innerHTML}`, {
                      method: 'DELETE',
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  })
                  .then(response => {
                      if (response.ok) {
                          alert('Menu deleted successfully');
                          tr.remove();
                      } else {
                          alert('Error in deleting the menu');
                      }
                  })
                  .catch(err => {
                      console.error('Error deleting menu:', err);
                      alert('Error from Menu.js:', err);
                  });
              }
          });

          // Update button click handler
          td5.querySelector('button').addEventListener('click', () => {
              let newName = prompt("Enter new name:", td1.innerHTML);
              let newDescription = prompt("Enter new description:", td2.innerHTML);
              let newPrice = prompt("Enter new price:", td3.innerHTML);
              let newCategory = prompt("Enter new category:", td7.innerHTML);

              // Check if all inputs are provided
              if (newName !== null && newDescription !== null && newPrice !== null && newCategory !== null) {
                  let updatedMenu = {
                      name: newName,
                      description: newDescription,
                      price: parseFloat(newPrice), // Ensure price is parsed as a number
                      category: newCategory
                  };

                  console.log('Updated Menu:', updatedMenu);

                  fetch(`http://localhost:8000/menus/${td6.innerHTML}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(updatedMenu)
                  })
                  .then(response => {
                      if (response.ok) {
                          return response.json();
                      } else {
                          throw new Error('Failed to update menu item');
                      }
                  })
                  .then(data => {
                      // Update table cell values with updated data
                      td1.innerHTML = data.name;
                      td2.innerHTML = data.description;
                      td3.innerHTML = data.price;
                      td7.innerHTML = data.category;

                      alert("Menu updated successfully");
                  })
                  .catch(err => {
                      console.error('Error updating menu:', err);
                      alert('Error in updating the menu: ' + err.message);
                  });
              }
          });

          let tbody = document.getElementsByTagName("tbody")[0];
          tbody.appendChild(tr);
      }
  })
  .catch(error => {
      console.error('Error in fetching the data:', error);
      alert('Error in fetching the data:', error.message);
  });
});


let addMenu = document.getElementById("addMenu");
// console.log(responseData.length + " customers");
addMenu.addEventListener('click', function(){
  console.log("Button press hoa ha add menu ka");
  let name = document.getElementById('name').value;
  let description = document.getElementById('description').value;
  let price = document.getElementById('price').value;
  let category = document.getElementById('category').value;
//   console.log(name, address, contactNo);
  fetch('http://localhost:8000/menus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, description, price , category })
  })
  .then(response =>  alert("Menu added successfully"))
 
  .catch(error => alert(error))});





let btn = document.getElementById("userAnchorTag");
console.log(btn);
console.log("Muneeb Bhaia");
btn.addEventListener(
  "click",
()=>{
  window.location.href = "http://localhost:5500/src/customers/customers.html"
}
)