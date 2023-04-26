import { addComment } from "./commentPage.js";


async function loadPosts () {

    const main = document.querySelector('main');
    main.innerHTML = `<div class="new-topic-border">
    <div class="header-background">
        <span>New Topic</span>
    </div>
    <form>
        <div class="new-topic-title">
            <label for="topicName">Title <span class="red">*</span></label>
            <input type="text" name="topicName" id="topicName">
        </div>
        <div class="new-topic-title">
            <label for="username">Username <span class="red">*</span></label>
            <input type="text" name="username" id="username">
        </div>
        <div class="new-topic-content">
            <label for="postText">Post <span class="red">*</span></label>
            <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
        </div>
        <div class="new-topic-buttons">
            <button class="cancel">Cancel</button>
            <button class="public">Post</button>
        </div>

    </form>
</div>

<div class="topic-title">

    <!-- topic component  -->
    <div class="topic-container">
        
    </div>`
    
    
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        if (!response.ok) {
            throw new Error()
        }
        const data = await response.json();

        Object.values(data).forEach(el => {
            const container = document.querySelector('.topic-title');
            const comment = document.createElement('div');
            
            comment.className = 'topic-name-wrapper';
            // comment.id = data._id;
            comment.innerHTML = `
            <div class="topic-name">
                <a href="#" data-id="${el._id}" class="normal">
                    <h2>${el.topicName}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${el.date}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${el.username}</span></p>
                        </div>
                    </div>
    
    
                </div>
            </div>
        </div>
    `
            comment.querySelector('a').addEventListener('click', addComment);
            container.appendChild(comment);
        })
        
    } catch (error) {
        alert(error.message)
    }
}


export {
    loadPosts
}