let responseData;
document.addEventListener('DOMContentLoaded', () => {
 

      fetch('http://localhost:8000/menus', {
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
          
          td1.innerHTML = data[i].Name;
          
          td2.innerHTML = 
          data[i].Description;
          
          td3.innerHTML = 
          data[i].Price;


          
          td4.innerHTML = "<button>Delete</button>";

          td5.innerHTML = data[i].ItemID;
          td6.innerHTML = data[i].Category;
          
          
          tr.appendChild(td1);
          
          tr.appendChild(td2);
          
          tr.appendChild(td3);
          
          tr.appendChild(td4);
          
          tr.appendChild(td6);
        
          td4.addEventListener(
            'click' , ()=>{
              console.log(td1.innerHTML);
              confirm(
                "Are you sure you want to delete this Menu?"
              )
              
             if(confirm){
              fetch(
                `http://localhost:8000/menus/${td5.innerHTML}`,
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              ).then(
                response => alert(
                    'Menu deleted successfully'
  
                )
               
              ).catch(err => {
              alert('Error from Menu.js:', err);
              });
             }



            }
          )
          
          
          
          let tbody = document.getElementsByTagName("tbody");
          
          tbody[0].appendChild(tr);
          
          
        }
       }
        
      )
     
      .catch(error => console.log('Error ha bhayya in fetching the data:', error));
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