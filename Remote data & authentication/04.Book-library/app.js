document.getElementById('loadBooks').addEventListener('click', loadData);
const form = document.querySelector('form');
form.addEventListener('submit', postData);
const saveBtn = document.createElement('button');
saveBtn.id = 'save-btn';
saveBtn.textContent = 'Save';
saveBtn.addEventListener('click', save);
saveBtn.style.display = 'none';
form.appendChild(saveBtn);
const submitBtn = form.querySelector('button');


const url = 'http://localhost:3030/jsonstore/collections/books';
const tBody = document.querySelector('tbody');

async function loadData() {
    tBody.innerHTML = '';
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error();
        const result = await response.json();

        Object.entries(result).forEach(el => {
            const tr = document.createElement('tr');
            const tdTitle = document.createElement('td');
            const tdAuthor1 = document.createElement('td');
            const tdBtns = document.createElement('td');
            const editBtn = document.createElement('button');
            const deleteBtn = document.createElement('button');
            tdTitle.textContent = el[1].title;
            tdAuthor1.textContent = el[1].author;
            tr.id = el[0];
            editBtn.textContent = 'Edit';
            deleteBtn.textContent = 'Delete';
            editBtn.addEventListener('click', edit);
            deleteBtn.addEventListener('click', del);
            tdBtns.appendChild(editBtn);
            tdBtns.appendChild(deleteBtn);
            tr.appendChild(tdTitle);
            tr.appendChild(tdAuthor1);
            tr.appendChild(tdBtns);
            tBody.appendChild(tr);
        })
    } catch (err) {
        alert(err);
    }
}

function edit(event) {
    const bookId = event.target.parentElement.parentElement.id;
    const parent = event.target.parentElement.parentElement;
    const info = parent.querySelectorAll('td');
    const [title, author] = info;
    const inputFiledTitle = form.querySelector('[name="title"]');
    const inputFieldAuthor = form.querySelector('[name="author"]');
    inputFiledTitle.value = title.textContent;
    inputFieldAuthor.value = author.textContent;
    saveBtn.className = bookId;
    form.querySelector('h3').textContent = 'Edit FORM';
    submitBtn.style.display = 'none';
    saveBtn.style.display = 'block';
}

async function del(event) {
    const id = event.target.parentElement.parentElement.id;
    
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`,{
            method: 'DELETE'
        });
        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        loadData();

    }catch (err) {
        alert(err.message);
    }
}


async function postData (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookData = {
        title:  formData.get('title'),
        author: formData.get('author')
    }

    if (!bookData.title || !bookData.author) {
        return alert('All fields must be filled');
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: bookData.title,
            author: bookData.author
        })
    }

    try{
        const response = await fetch(url, options);
        if (!response.ok) {
            const error = await response.json();
            throw error
        }
        loadData();
        event.target.reset();
    }catch (error) {
        alert(error.message)
    }
    
}

async function save (event) {
    event.preventDefault();
    const data = new FormData(form);
    const bookInfo = {
        title:  data.get('title'),
        author: data.get('author')
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: bookInfo.title,
            author: bookInfo.author
        })
    }

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + saveBtn.className, options);
        if (!response.ok) {
            const err = await response.json();
            throw err;
        }
        loadData();
        form.reset();
        saveBtn.id = '';
        saveBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        form.querySelector('h3').textContent = 'FORM';
    } catch (err) {
        alert(err.message);
    }
}