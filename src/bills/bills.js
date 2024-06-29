let btn = document.getElementById("billAnchorTag");
console.log(btn);
console.log("Muneeb Bhaia");
btn.addEventListener(
    "click",
  ()=>{
    window.location.href = "http://localhost:5500/src/bills/bills.html"
  }
)

document.addEventListener('DOMContentLoaded', () => {
    const billForm = document.getElementById('bill-form');
    const billList = document.getElementById('bill-list');

    billForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const price = document.getElementById('bill-price').value;
        const orderID = document.getElementById('bill-order-id').value;
        const customerID = document.getElementById('bill-customer-id').value;

        fetch('/bills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price, orderID, customerID })
        })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement('li');
            li.textContent = `BillNo: ${data.BillNo} - Price: ${price} - OrderID: ${orderID} - CustomerID: ${customerID}`;
            billList.appendChild(li);
        })
        .catch(error => console.error('Error:', error));
    });

    fetch('/bills')
    .then(response => response.json())
    .then(data => {
        data.forEach(bill => {
            const li = document.createElement('li');
            li.textContent = `BillNo: ${bill.BillNo} - Price: ${bill.Price} - OrderID: ${bill.OrderID} - CustomerID: ${bill.CustomerID}`;
            billList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
});
