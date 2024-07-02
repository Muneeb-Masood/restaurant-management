
document.addEventListener(
  'DOMContentLoaded',
  () => {
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

    btn.classList.remove("active");
      btn1.classList.remove("active");
      btn2.classList.remove("active");
      dashboard.classList.add("active");
      btn4.classList.remove("active");
      btn5.classList.remove("active");
      btn6.classList.remove("active");
      btn7.classList.remove("active");
      btn8.classList.remove("active");
      btn3.classList.remove("active");
    
    
    dashboard.addEventListener(
      "click",
      ()=>{
      window.location.href = "http://localhost:5501/src/index.html"
     
    }
    )


    btn.addEventListener(
      "click",
      ()=>{
      window.location.href = "http://localhost:5501/src/customers/customers.html"
     
    }
    )
    
    
    btn1.addEventListener(
      "click",
    ()=>{
      btn.classList.remove("active");
      btn1.classList.add("active");
      btn2.classList.remove("active");
      btn3.classList.remove("active");
      btn4.classList.remove("active");
      btn5.classList.remove("active");
      btn6.classList.remove("active");
      btn7.classList.remove("active");
      btn8.classList.remove("active");

      window.location.href = "http://localhost:5501/src/chefs/chefs.html"
    }
    )
    
    
    
    btn2.addEventListener(
      "click",
    ()=>{
      btn.classList.remove("active");
      btn1.classList.remove("active");
      btn2.classList.add("active");
      btn3.classList.remove("active");
      btn4.classList.remove("active");
      btn5.classList.remove("active");
      btn6.classList.remove("active");
      btn7.classList.remove("active");
      btn8.classList.remove("active");
      window.location.href = "http://localhost:5501/src/waiters/waiters.html"
    }
    )
    
    
  
    btn3.addEventListener(
      "click",
    ()=>{
      btn.classList.remove("active");
      btn1.classList.remove("active");
      btn2.classList.remove("active");
      btn3.classList.add("active");
      btn4.classList.remove("active");
      btn5.classList.remove("active");
      btn6.classList.remove("active");
      btn7.classList.remove("active");
      btn8.classList.remove("active");
      window.location.href = "http://localhost:5501/src/feedbacks/feedbacks.html"
    }
    )
    
    
    
    btn4.addEventListener(
      "click",
    ()=>{
      btn.classList.remove("active");
      btn1.classList.remove("active");
      btn2.classList.remove("active");
      btn3.classList.remove("active");
      btn4.classList.add("active");
      btn5.classList.remove("active");
      btn6.classList.remove("active");
      btn7.classList.remove("active");
      btn8.classList.remove("active");
      window.location.href = "http://localhost:5501/src/managers/managers.html"
    }
    )
    
    

    btn5.addEventListener(
      "click",
    ()=>{
      btn.classList.remove("active");
      btn1.classList.remove("active");
      btn2.classList.remove("active");
      btn3.classList.remove("active");
      btn4.classList.remove("active");
      btn5.classList.add("active");
      btn6.classList.remove("active");
      btn7.classList.remove("active");
      btn8.classList.remove("active");
      window.location.href = "http://localhost:5501/src/orders/orders.html"
    }
    )
    
    
  
    btn6.addEventListener(
      "click",
    ()=>{
      btn.classList.remove("active");
      btn1.classList.remove("active");
      btn2.classList.remove("active");
      btn3.classList.remove("active");
      btn4.classList.remove("active");
      btn5.classList.remove("active");
      btn6.classList.add("active");
      btn7.classList.remove("active");
      btn8.classList.remove("active");
      window.location.href = "http://localhost:5501/src/sales/sales.html"
    }
    )
    
    
    

    btn7.addEventListener(
      "click",
    ()=>{
      btn.classList.remove("active");
      btn1.classList.remove("active");
      btn2.classList.remove("active");
      btn3.classList.remove("active");
      btn4.classList.remove("active");
      btn5.classList.remove("active");
      btn6.classList.remove("active");
      btn7.classList.add("active");
      btn8.classList.remove("active");
      window.location.href = "http://localhost:5501/src/bills/bills.html"
    }
    )
    
    
    

    btn8.addEventListener(
      "click",
    ()=>{
      btn.classList.remove("active");
      btn1.classList.remove("active");
      btn2.classList.remove("active");
      btn3.classList.remove("active");
      btn4.classList.remove("active");
      btn5.classList.remove("active");
      btn6.classList.remove("active");
      btn7.classList.remove("active");
      btn8.classList.add("active");
      window.location.href = "http://localhost:5501/src/menus/menus.html"
    }
    )
  }
)