//import './styles.css';
// import './customers';
// import './orders';
// import './bills';
// import './managers';
// import './waiters';
// import './chefs';
const btn=document.querySelector('.customer-btn');
const boxes=document.querySelector('.card-boxes');
console.log(boxes);
console.log(btn);
btn.addEventListener('click',()=>{
    console.log("button pressed");
    window.location.href = "http://localhost:3000/src/customers/customers.html";
    
})