// document.addEventListener('DOMContentLoaded', () => {
//     const customerForm = document.getElementById('customer-form');
//     const customerList = document.getElementById('customer-list');

//     customerForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         console.log("Button press hoa ha add customer ka");
//         const name = document.getElementById('customer-name').value;
//         const address = document.getElementById('customer-address').value;
//         const contactNo = document.getElementById('customer-contact').value;

//         fetch('https://localhost:8000/customers', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: { name, address, contactNo }
//         })
//         .then(response => response.json())
//         .then(data => {
//             const li = document.createElement('li');
//             li.textContent = `${name} - ${address} - ${contactNo}`;
//             customerList.appendChild(li);
//         })
//         .catch(error => console.log('Error:', error));
//     });

//     fetch('/customers')
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(customer => {
//             const li = document.createElement('li');
//             li.textContent = `${customer.Name} - ${customer.Address} - ${customer.ContactNo}`;
//             customerList.appendChild(li);
//         });
//     })
//     .catch(error => console.log('Error:', error));
    
// });

let btn = document.getElementById("userAnchorTag");
console.log(btn);
console.log("Muneeb Bhaia");
btn.addEventListener(
    "click",
  ()=>{
    window.location.href = "http://localhost:5500/src/customers/customers.html"
  }
)
