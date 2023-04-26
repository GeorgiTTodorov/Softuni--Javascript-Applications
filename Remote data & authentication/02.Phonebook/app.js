function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadData);
    document.getElementById('btnCreate').addEventListener('click', createData);   
}
const phoneBook = document.getElementById('phonebook');
const url = 'http://localhost:3030/jsonstore/phonebook';

async function loadData () {
    phoneBook.innerHTML = '';
    try {
    const response = await fetch(url);
    if(!response.ok) throw new Error('Error');
    const result = await response.json();
    Object.entries(result).forEach(el => {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', del);

        li.id = `${el[0]}`;
        li.textContent = `${el[1].person}: ${el[1].phone}`
        li.appendChild(deleteBtn);
        phoneBook.appendChild(li);
    })
} catch(error) {
    alert(error);
}
}
async function del(event) {
    const id = event.target.parentElement.id;
    try {

    const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error();
    loadData();

    } catch (err) {
        alert(err);
    }
}

async function createData () {
    const personName = document.getElementById('person').value;
    const phoneNumber = document.getElementById('phone').value;
    if (!personName || !phoneNumber) return;

    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            person: personName,
            phone: phoneNumber, 
        })
    });
    if(!response.ok) throw new Error();
    loadData();
    
    } catch (error) {
        alert(error);
    }
}

attachEvents();