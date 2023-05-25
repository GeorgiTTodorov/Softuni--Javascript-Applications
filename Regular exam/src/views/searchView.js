import {html} from '../../node_modules/lit-html/lit-html.js';
import { searchFruit } from '../data/fruits.js';
import { createSubmitHandler } from '../data/utils.js';

const searchTemplate = (onSubmit, hasClicked, fruits) => 
html `
<section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSubmit}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
${hasClicked ? html `<h4>Results:</h4>

<div class="search-result">

    ${fruits.length == 0 ? html `
    <p class="no-result">No result.</p>` : fruits.map(el => 
    html `
    <div class="fruit">
    <img src=${el.imageUrl} alt="example1" />
    <h3 class="title">${el.name}</h3>
    <p class="description">${el.description}</p>
    <a class="details-btn" href="/details/${el._id}">More Info</a>
    </div>`)}

</div>` : null}

</section>`


export async function searchPage(ctx) {
    let hasClicked = false;
    
    ctx.render(searchTemplate(createSubmitHandler(onSubmit), hasClicked))
    

    async function onSubmit({search}) {
        hasClicked = true;

        if (search == '') {
            return alert('Please fill in the field')
        }
        const query = search.trim();
        const url = `?where=name%20LIKE%20%22${query}%22`
        const fruits = await searchFruit(url);
        ctx.render(searchTemplate(createSubmitHandler(onSubmit), hasClicked, fruits))
    }
}