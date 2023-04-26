import { addComment } from "./commentPage.js";

async function create (event) {
    event.preventDefault();
    const id = localStorage.getItem('commentId')
    const form = document.querySelector('.answer form');

    let date = new Date();
        
    const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    

    const formData = new FormData(form);
    const username = formData.get('username');
    const text = document.getElementById('comment').value;

    if (!username) {
        return;
    }

    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                text: text,
                id: id,
                date: time
            })
        }
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', options);
        if (!response.ok) {
            throw new Error();
        }
        localStorage.clear();
        form.reset();
        addComment();
        
    } catch (error) {
        alert(error.message);
    }
}


export {create}