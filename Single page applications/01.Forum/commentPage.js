import { create } from "./createComment.js";

async function addComment (event) {
    const id = event.target.parentElement.dataset.id;
    
    const divThemeContent = document.createElement('div');
    divThemeContent.className = 'theme-content';

    try {
        const response = await fetch (`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
        if (!response.ok) {
            throw new Error();
        }
        const result = await response.json();

        divThemeContent.innerHTML = `<div class="theme-title">
    <div class="theme-name-wrapper">
        <div class="theme-name">
            <h2>${result.topicName}</h2>

        </div>

    </div>
</div>`

        const divComment = document.createElement('div');
        divComment.className = 'comment';
        divComment.innerHTML = `<div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${result.username}</span> posted on <time>${result.date}</time></p>

        <p class="post-content">${result.postText}</p>
    </div>`

        const divAnswerComment = document.createElement('div');
        divAnswerComment.className = 'answer-comment';
        divAnswerComment.innerHTML = `<p><span>currentUser</span> comment:</p>
        <div class="answer">
            <form>
                <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                <div>
                    <label for="username">Username <span class="red">*</span></label>
                    <input type="text" name="username" id="username">
                </div>
                <button>Post</button>
            </form>
        </div>` 

        const documentFragment = document.createDocumentFragment();
        divAnswerComment.querySelector('button').addEventListener('click', create);
        documentFragment.appendChild(divThemeContent);
        documentFragment.appendChild(divComment);
        documentFragment.appendChild(divAnswerComment);

        localStorage.setItem('commentId', id);
        
       document.querySelector('main').replaceChildren(documentFragment)
       const comments = await userComment(id);
       

       for (const comment of comments) {
            const divUserComment = document.createElement('div');
            divUserComment.className = 'user-comment';
            divUserComment.innerHTML = `<div class="topic-name-wrapper">
            <div class="topic-name">
            <p><strong>${comment.username}</strong> commented on <time>${comment.date}</time></p>
            <div class="post-content">
                <p>${comment.text}</p>
            </div>
        </div>
        </div>`

        document.querySelector('.comment').appendChild(divUserComment);
       }
    } catch (error) {
        alert(error.message)
    }
    
}


async function userComment (id) {
    try {
        const res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`);
        if (!res.ok) {
            throw new Error();
        }
        const comments = await res.json();

        return Object.values(comments).filter(comment => comment.id === id)
    } catch (error) {
        alert(error.message);
    }

}


export {
    addComment,
    userComment
}