document.addEventListener(
    'DOMContentLoaded' , 
    () => {
  
      const orderNumber = document.getElementById("orderNumber");
      const customerNumber = document.getElementById("customerNumber");
      const saleNumber = document.getElementById("saleNumber");
      const chefNumber = document.getElementById("chefNumber");
      const waiterNumber = document.getElementById("waiterNumber");
      const feedbackNumber = document.getElementById("feedbackNumber");

      const orderBox = document.getElementById("orderBox");
      const customerBox = document.getElementById("customerBox");
      const saleBox = document.getElementById("saleBox");
      const chefBox = document.getElementById("chefBox");
      const waiterBox = document.getElementById("waiterBox");
      const feedbackBox = document.getElementById("feedbackBox");

     
      orderBox.addEventListener("click" , ()=> {

        window.location.href = "http://localhost:5501/src/orders/orders.html";
      });


      customerBox.addEventListener("click" , ()=> {
        window.location.href = "http://localhost:5501/src/customers/customers.html";
      });


      saleBox.addEventListener("click" , ()=> {
        window.location.href = "http://localhost:5501/src/sales/sales.html";
      });



      waiterBox.addEventListener("click" , ()=> {
        window.location.href = "http://localhost:5501/src/waiters/waiters.html";
      });



      feedbackBox.addEventListener("click" , ()=> {
        window.location.href = "http://localhost:5501/src/feedbacks/feedbacks.html";
      });

      chefBox.addEventListener("click" , ()=> {
        window.location.href = "http://localhost:5501/src/chefs/chefs.html";
      });

      

  
      fetch("http://localhost:8000/order")
        .then(response => response.json())
       .then(data => {
         console.log(data);
       
         orderNumber.textContent = data.length;
      
    }
  );
  
  
  fetch("http://localhost:8000/customers")
    .then(response => response.json())
   .then(data => {
     console.log(data);
     customerNumber.textContent = data.length;
   }
  );
  
  fetch("http://localhost:8000/sales")
    .then(response => response.json())
   .then(data => {
     console.log(data);
     saleNumber.textContent = data.length;
   });
  
   fetch("http://localhost:8000/chefs")
    .then(response => response.json())
   .then(data => {
     console.log(data);
     chefNumber.textContent = data.length;
   });
  
   fetch("http://localhost:8000/waiters")
    .then(response => response.json())
   .then(data => {
     console.log(data);
     waiterNumber.textContent = data.length;
   });
  
  
   fetch("http://localhost:8000/feedback")
    .then(response => response.json())
   .then(data => {
     console.log(data);
     feedbackNumber.textContent = data.length;
   });
  
   
  
  
  
  });
  