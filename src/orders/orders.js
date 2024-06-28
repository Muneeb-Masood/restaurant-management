document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
    const orderList = document.getElementById('order-list');

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const noOfItems = document.getElementById('order-no-of-items').value;
        const customerID = document.getElementById('order-customer-id').value;

        fetch('/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ noOfItems, customerID })
        })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement('li');
            li.textContent = `OrderNo: ${data.OrderNo} - NoOfItems: ${noOfItems} - CustomerID: ${customerID}`;
            orderList.appendChild(li);
        })
        .catch(error => console.error('Error:', error));
    });

    fetch('/orders')
    .then(response => response.json())
    .then(data => {
        data.forEach(order => {
            const li = document.createElement('li');
            li.textContent = `OrderNo: ${order.OrderNo} - NoOfItems: ${order.NoOfItems} - CustomerID: ${order.CustomerID}`;
            orderList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
});
