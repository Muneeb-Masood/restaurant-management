import './customers';
// 

let btn = document.getElementById("userAnchorTag");
console.log(btn);
console.log("Muneeb Bhaia");
btn.addEventListener(
    "click",
  ()=>{
    window.location.href = "http://localhost:5500/src/customers/customers.html"
  }
)