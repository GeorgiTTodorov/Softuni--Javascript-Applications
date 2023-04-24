function attachEvents() {
    const textArea = document.getElementById('messages');
    document.getElementById('submit').addEventListener('click', postData);
    document.getElementById('refresh').addEventListener('click', getData);
    const url = 'http://localhost:3030/jsonstore/messenger';

    async function getData() {
        textArea.textContent = '';
        let collection = [];
        try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Érror');
        const data = await response.json();
        
        Object.values(data).forEach(el => {
            collection.push(`${el.author}: ${el.content}`);
        })
        textArea.textContent = collection.join('\n');
    } catch(err) {
        alert(err);
        } 
    }

    async function postData () {
        const name = document.querySelector('[name="author"]');
        const message = document.querySelector('[name="content"]');
        if (!name.value || !message.value) return; 

        try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author: name.value,
                content: message.value
            })
        });

        name.value = '';
        message.value = '';
        document.getElementById('refresh').click();

        if (!res.ok) throw new Error('Error') 
        
        } catch (err) {
            alert(err);
        }
    }
}

attachEvents();