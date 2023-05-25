import {html} from '../../node_modules/lit-html/lit-html.js';
import { deleteFruit, getFruitById } from '../data/fruits.js';
import { getUserData } from '../data/utils.js';


const detailsTemplate = (fruit, isOwner, onDelete) => html `<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${fruit.imageUrl} alt="example1" />
  <p id="details-title">${fruit.name}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p>
       ${fruit.description}
        </p>
          <p id="nutrition">Nutrition</p>
         <p id = "details-nutrition">
            ${fruit.nutrition}
              </p>
    </div>
     <!--Edit and Delete are only for creator-->
    ${isOwner ? html `<div id="action-buttons">
  <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
  <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
</div>` : null}
  </div>
</div>
</section>`

export async function detailsPage(ctx) {
    const fruitId = ctx.params.id;
    const userId = getUserData()?._id;
    const fruit = await getFruitById(fruitId);
    const isOwner = userId == fruit._ownerId;
    ctx.render(detailsTemplate(fruit, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteFruit(fruitId);
            ctx.page.redirect('/catalog');
        }
    }

}