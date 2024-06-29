


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

      fetch('http://localhost:8000/chefs', {
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
          
          td1.innerHTML = data[i].Name;
          
          td2.innerHTML = 
          data[i].Role;
          
          td3.innerHTML = 
          data[i].Email;
          
          td4.innerHTML = "<button>Delete</button>";
          td4.id = "deleteButton";
          
          
          tr.appendChild(td1);
          
          tr.appendChild(td2);
          
          tr.appendChild(td3);
          
          tr.appendChild(td4);
        
          td4.addEventListener(
            'click' , ()=>{
              fetch(
                `http://localhost:8000/chefs/${data[i].ID}`,
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              )
            }
          );
          
          
          
          
          let tbody = document.getElementsByTagName("tbody");
          
          tbody[0].appendChild(tr);
          
          
        }
       }
        
      )
     
      .catch(error => console.log('Error ha bhayya in fetching the data:', error));
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





let btn = document.getElementById("userAnchorTag");
console.log(btn);
console.log("Muneeb Bhaia");
btn.addEventListener(
  "click",
()=>{
  window.location.href = "http://localhost:5500/src/chefs/chefs.html"
}
)