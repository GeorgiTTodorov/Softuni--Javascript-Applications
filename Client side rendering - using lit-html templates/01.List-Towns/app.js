import {html, render} from './node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', onClick);
let input = document.getElementById('towns');

const dataFromInput = (input) => input.value.trim().split(', ');
const clearInput = (input) => input.value = '';

function onClick(event) {
    event.preventDefault();
    if (!input.value.includes(', ')) {
        return;
    }
    const data = dataFromInput(input);
    renderData(data);
    clearInput(input);
}

const renderData = (data) => {
    const root = document.getElementById('root');
    render(componentTemplate(data), root);
}
   
const componentTemplate = (data) => html `
<ul>
    ${data.map(item => 
        html `<li>${item}</li>`
    )}
</ul>`

