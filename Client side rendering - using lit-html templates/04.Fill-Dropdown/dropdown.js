import { get, post } from './requester.js';

const form = document.querySelector('form');
form.addEventListener('submit', addItem);

get();

function addItem(event) {
    event.preventDefault();
    const input = document.getElementById('itemText');
    const value = input.value;
    post(value);
    get();
    form.reset();
}