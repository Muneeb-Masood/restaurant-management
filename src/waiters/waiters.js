document.addEventListener('DOMContentLoaded', () => {
    const waiterForm = document.getElementById('waiter-form');
    const waiterList = document.getElementById('waiter-list');

    waiterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('waiter-name').value;

        fetch('/waiters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement('li');
            li.textContent = `WaiterID: ${data.ID} - Name: ${name}`;
            waiterList.appendChild(li);
        })
        .catch(error => console.error('Error:', error));
    });

    fetch('/waiters')
    .then(response => response.json())
    .then(data => {
        data.forEach(waiter => {
            const li = document.createElement('li');
            li.textContent = `WaiterID: ${waiter.ID} - Name: ${waiter.Name}`;
            waiterList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
});
