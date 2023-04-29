import { cats } from "./catSeeder.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const allCatsSection = document.getElementById('allCats');

const img = './images/';

const catTemplate = (cats) => html `
<ul>
    ${cats.map((cat) => {
       return html `<li>
                <img src=${img + cat.imageLocation + '.jpg'} width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${showCode}>Show status code</button>
                    <div class="status" style="display: none" id=${cat.id}>
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>`
    })}
</ul>`

render(catTemplate(cats), allCatsSection);

function showCode (event) {
    const btn = event.target;
    btn.textContent = 'Hide status code';
    const parent = btn.parentElement;
    const status = parent.querySelector('.status');

    if (status.style.display === 'none' ) {
        status.style.display = 'block'
    } else {
        status.style.display = 'none'

    }

}