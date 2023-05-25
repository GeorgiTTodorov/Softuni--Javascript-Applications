import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllFruits } from '../data/fruits.js';

const catalogTemplate = (data) => html `<h2>Fruits</h2>
<section id="dashboard">
  ${data.length == 0 ? html `<h2>No fruit info yet.</h2>` : html `
  ${data.map(el => html `<div class="fruit">
            <img src=${el.imageUrl} alt="example1" />
            <h3 class="title">${el.name}</h3>
            <p class="description">${el.description}</p>
            <a class="details-btn" href="/details/${el._id}">More Info</a>
          </div>`)}`}
  
</section>
 `

 export async function catalogPage(ctx) {
    const data = await getAllFruits();
    console.log(data);
    ctx.render(catalogTemplate(data));
 }