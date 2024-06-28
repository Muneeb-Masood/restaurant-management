document.addEventListener('DOMContentLoaded', () => {
    const chefForm = document.getElementById('chef-form');
    const chefList = document.getElementById('chef-list');

    chefForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('chef-name').value;

        fetch('/chefs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement('li');
            li.textContent = `ChefID: ${data.ID} - Name: ${name}`;
            chefList.appendChild(li);
        })
        .catch(error => console.error('Error:', error));
    });

    fetch('/chefs')
    .then(response => response.json())
    .then(data => {
        data.forEach(chef => {
            const li = document.createElement('li');
            li.textContent = `ChefID: ${chef.ID} - Name: ${chef.Name}`;
            chefList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
});
