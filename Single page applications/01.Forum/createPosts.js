import { addComment } from "./commentPage.js";
import { loadPosts } from "./home.js";


async function postData (event) {
    event.preventDefault();
    const form = document.querySelector('.new-topic-border form');
    const formData = new FormData(form);
    const {topicName, username, postText} = Object.fromEntries(formData);

    if (!topicName || !username || !postText) {
        return;
    }

    try {
        let date = new Date();
        
        const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topicName: topicName,
                username: username,
                postText: postText,
                date: time
            })
        };

        const response = await fetch ('http://localhost:3030/jsonstore/collections/myboard/posts', options);

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        const data = await response.json();
        
        const container = document.querySelector('.topic-title');
        const comment = document.createElement('div');
        
        comment.className = 'topic-name-wrapper';
        // comment.id = data._id;
        comment.innerHTML = `
        <div class="topic-name">
            <a href="#" dataset.id="${data._id}" class="normal">
                <h2>${data.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${data.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${data.username}</span></p>
                    </div>
                </div>


            </div>
        </div>
    </div>
`
        comment.querySelector('a').addEventListener('click', addComment);
        loadPosts();
        form.reset();

    } catch (error) {
        alert(error.message)
    }
}

function cancelBtn (e) {
    e.preventDefault();
    e.target.parentElement.parentElement.reset();
}



export {
    postData,
    cancelBtn
}



//<time>${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</time>
// innerHTML for comment
//<div class="header">
//<img src="./static/profile.png" alt="avatar">
//<p><span>${data.username}</span> posted on <time>${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</time></p>
//<p class="post-content">${data.postText}</p>
//</div>