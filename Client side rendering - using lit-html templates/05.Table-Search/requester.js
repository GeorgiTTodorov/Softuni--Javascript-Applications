import {html, render} from './node_modules/lit-html/lit-html.js'

const tBody = document.querySelector('.container tbody');

async function requester () {
    
    const url = 'http://localhost:3030/jsonstore/advanced/table';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error()
        }
        const result = await response.json();
        const data = Object.values(result);
        
        render(template(data), tBody);
        
    } catch (error) {
        alert(error);
        throw error;
    }
}

const template = (data) => html `${data.map(el => html `
<tr id=${el._id}>
<td>${el.firstName} ${el.lastName}</td>
<td>${el.email}</td>
<td>${el.course}</td>
</tr>`)}`



export { requester };