document.getElementById('submit').addEventListener('click', submit);
const tableBody = document.querySelector('tbody');
const url = 'http://localhost:3030/jsonstore/collections/students';

async function loadData () {
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const result = await response.json();

        Object.values(result).forEach(el => {
            const tr = document.createElement('tr');
            const tdFirstName = document.createElement('td');
            const tdLastName = document.createElement('td');
            const tdFacultyNumber = document.createElement('td');
            const tdGrade = document.createElement('td');
            tdFirstName.textContent = el.firstName;
            tdLastName.textContent = el.lastName;
            tdFacultyNumber.textContent = el.facultyNumber;
            tdGrade.textContent = Number(el.grade);
            tr.id = el._id;
            tr.appendChild(tdFirstName);
            tr.appendChild(tdLastName);
            tr.appendChild(tdFacultyNumber);
            tr.appendChild(tdGrade);
            tableBody.appendChild(tr);

        })
    } catch (error) {
        alert(error);
    }
}

loadData();

async function submit(event) {
    event.preventDefault();
    tableBody.innerHTML = '';
    let inputName = document.querySelector('[name="firstName"]').value;
    let inputLastName = document.querySelector('[name="lastName"]').value;
    let fNumber = document.querySelector('[name="facultyNumber"]').value;
    let grade = document.querySelector('[name="grade"]').value;

    try {
        if (inputName === '' || inputLastName === '' || fNumber === '' || !Number(fNumber) || grade === '' || !Number(grade)) {
            return;
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: inputName,
                lastName: inputLastName,
                facultyNumber: fNumber,
                grade: grade
            })
        })
        if (!response.ok) throw new Error();
        
        loadData();
        
    }catch (err) {
        alert(err);
    }
}