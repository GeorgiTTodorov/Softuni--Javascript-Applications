async function solution() {
    const mainSection = document.getElementById('main');
    
    try {
        const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const data = await response.json();

        Object.values(data).forEach(el => {

        const div = document.createElement('div');
        div.className = 'accordion';
        div.innerHTML = `<div class="head">
                <span>${el.title}</span>
                <button class="button" id="${el._id}">More</button>
            </div>
            <div class="extra">
                <p></p>
            </div>` 
        mainSection.appendChild(div);
    })
    
    const btns = Array.from(document.querySelectorAll('button'));
    btns.forEach(el => el.addEventListener('click', showMore));

    async function showMore(event) {
        const button = event.target;
        const btnId = button.id;
        const parent = button.parentElement.parentElement;
        const hiddenDiv = parent.querySelector('.extra');
        const paragraph = hiddenDiv.querySelector('p');

        try {
        const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${btnId}`);
        if (!response.ok) throw new Error();
        const result = await response.json();
        paragraph.textContent = `${result.content}`;
        
        if (button.textContent === 'More') {
            hiddenDiv.style.display = 'block';
            button.textContent = 'Less'
        } else {
            hiddenDiv.style.display = 'none';
            button.textContent = 'More'
        }
            
        } catch (err) {
            console.log(err);
        }
        
    }
        
    } catch (e) {
        console.log(e);
    }
}

solution();