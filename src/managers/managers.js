document.addEventListener('DOMContentLoaded', () => {
    const managerForm = document.getElementById('manager-form');
    const managerList = document.getElementById('manager-list');

    managerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('manager-name').value;

        fetch('/managers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement('li');
            li.textContent = `ManagerID: ${data.ID} - Name: ${name}`;
            managerList.appendChild(li);
        })
        .catch(error => console.error('Error:', error));
    });

    fetch('/managers')
    .then(response => response.json())
    .then(data => {
        data.forEach(manager => {
            const li = document.createElement('li');
            li.textContent = `ManagerID: ${manager.ID} - Name: ${manager.Name}`;
            managerList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
});
