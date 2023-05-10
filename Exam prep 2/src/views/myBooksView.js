import {html} from '../../node_modules/lit-html/lit-html.js';
import { get } from '../data/api.js';
import { getUserData } from '../data/utils.js';

const myBooksTemplate = (data) => html `<section id="my-books-page" class="my-books">
<h1>My Books</h1>
${data.length == 0 ? html `<p class="no-books">No books in database!</p>` : html `
<ul class="my-books-list">
    ${data.map(li => html `<li class='${li.type}Books'>
                    <h3>${li.title}</h3>
                    <p>Type: ${li.type}</p>
                    <p class="img"><img src=${li.imageUrl}></p>
                    <a class="button" href="/details/${li._id}">Details</a>
                </li>`)}
</ul>`}
</section>`


export async function myBooksPage(ctx) {
    const user = getUserData();
    const userId = user._id;
    const data = await get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    ctx.render(myBooksTemplate(data));
}