import {html, render} from './node_modules/lit-html/lit-html.js';

const selectMenu = document.getElementById('menu');

async function requester (method, text) {

    const url = `http://localhost:3030/jsonstore/advanced/dropdown`;
   

    if (method === 'GET') {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error();
            }
            const result = await response.json();
            const entries = Object.values(result);
            rendering(entries);
            
        } catch (error) {
            alert(error);
            throw error;
        }
    } else if (method === 'POST') {

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({text})
        }
        try {
            if (!text) {
                return;
            }
            const res = await fetch(url, options);
            if (!res.ok) {
                throw new Error()
            }
            const info = await res.json();
            const values = Object.entries(info);
            rendering(values);
            
        } catch (err) {
            alert(err);
            throw err;
        }
    }

}

const get = requester.bind(null, 'GET');
const post = requester.bind(null, 'POST');


const dataTemplate = (entries) => html `${entries.map(el => html`<option value=${el._id}>${el.text}</option>`)}`


function rendering (entries) {
    dataTemplate(entries);
    render(dataTemplate(entries), selectMenu)
}


export {get, post}