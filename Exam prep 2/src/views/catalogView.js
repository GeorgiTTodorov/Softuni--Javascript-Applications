import {html} from '../../node_modules/lit-html/lit-html.js';
import { loadAllBooks } from '../data/books.js';

const catalogTemplate = (data) => html `<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
${data.length == 0 ? html `<p class="no-books">No books in database!</p>` : html `<ul class="other-books-list">
    ${data.map(el => html `<li class="otherBooks">
 <h3>${el.title}</h3>
 <p>Type: ${el.type}</p>
 <p class="img"><img src=${el.imageUrl}></p>
 <a class="button" href="/details/${el._id}">Details</a>
 </li>`)}
</ul>`}
</section>`


export async function catalogPage(ctx) {
    const data = await loadAllBooks();
    ctx.render(catalogTemplate(data));
}

