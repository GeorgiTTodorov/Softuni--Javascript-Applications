import {html, render} from './node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';


const target = document.getElementById('contacts');

const structureTemplate = (user) => html `<div class="contact card">
<div>
<i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
<h2>Name: ${user.name}</h2>
<button class="detailsBtn">Details</button>
 <div class="details" id=${user.id}>
    <p>Phone number: ${user.phoneNumber}</p>
    <p>Email: ${user.email}</p>
    </div>
</div>
</div>
</div>`

render(contacts.map(structureTemplate), target);


target.addEventListener('click', (event) => {
    
    if (event.target.classList.contains('detailsBtn')) {
        const info = event.target.parentElement.getElementsByClassName('details')[0];
        // const details = parent.querySelector('.details');
        
        if (info.style.display === 'block') {
            info.style.display = 'none'
            
        } else {
            info.style.display = 'block'
            
        }
    }
   
})