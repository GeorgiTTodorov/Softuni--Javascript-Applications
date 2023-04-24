function attachEvents() {
    const loadPosts = document.getElementById('btnLoadPosts');
    const viewPosts = document.getElementById('btnViewPost');
    loadPosts.addEventListener('click', posts);
    
    async function posts () {

        let collection = [];

        try {
            const url = `http://localhost:3030/jsonstore/blog/posts`;
            const response = await fetch (url);
            if (!response.ok) throw new Error();
            const data = await response.json();
        
            Object.values(data).forEach(el => {
                const option = document.createElement('option');
                option.value = `${el.id}`
                option.textContent = `${el.title}`;
                document.getElementById('posts').appendChild(option);
                collection.push({body: el.body, title: el.title, id: el.id});
            })
            viewPosts.addEventListener('click', comments);

            async function comments () {
                try {
                    const elValue = document.getElementById('posts').value;
                    const urlComments = `http://localhost:3030/jsonstore/blog/comments`;
                    const responseComments = await fetch(urlComments);

                    if (!responseComments.ok) throw new Error();

                    const result = await responseComments.json();
                    const postComments = document.getElementById('post-comments');
                    postComments.innerHTML = '';

                    const currentElement = Object.values(result).filter(x => x.postId === elValue);
                    const target = collection.filter(y => y.id === currentElement[0].postId);

                    document.getElementById('post-title').textContent = target[0].title;
                    document.getElementById('post-body').textContent = target[0].body;
                    

                    currentElement.forEach(el => {
                        const li = document.createElement('li');
                        li.id = `${el.id}`;
                        li.textContent = `${el.text}`;
                        postComments.appendChild(li);
                    })  
                    
                    
                }catch (err) {
                    console.log(err);
                }
            }

        }catch (err) {
            console.log(err);
        }
    }


    
}

attachEvents();