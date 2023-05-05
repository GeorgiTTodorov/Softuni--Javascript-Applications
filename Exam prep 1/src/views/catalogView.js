import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllOffers } from '../data/offers.js';

const catalogView = (offers) => html `<section id="dashboard">
<h2>Job Offers</h2>

<!-- Display a div with information about every post (if any)-->
${offers.length > 0 ? offers.map(el => html `<div class="offer">
  <img src=${el.imageUrl} alt="example1" />
  <p>
    <strong>Title: </strong><span class="title">${el.title}</span>
  </p>
  <p><strong>Salary:</strong><span class="salary">${el.salary}</span></p>
  <a class="details-btn" href="/details/${el._id}">Details</a>
</div>`) : html `<h2>No offers yet.</h2>`}

</section>`


export async function catalogPgae(ctx) {
    const offers = await getAllOffers()
    ctx.render(catalogView(offers))
}