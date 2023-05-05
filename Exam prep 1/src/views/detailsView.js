import {html} from '../../node_modules/lit-html/lit-html.js';
import { deleteOffer, getById } from '../data/offers.js';
import { getUserData } from '../data/utils.js';


const detailsTemplate = (user, offer, onDelete) => html `<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${offer.imageUrl} alt="example1" />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">IT, Developer, WEB</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span
        >${offer.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span
        >${offer.requirements}</span
      >
    </div>
  </div>
  <p>Applications: <strong id="applications">1</strong></p>
  <div id="action-buttons">
  <!--Edit and Delete are only for creator-->
  ${user && offer._ownerId === user._id ? html `
    <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
    <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : null}

    <!--Bonus - Only for logged-in users ( not authors )-->
    ${user && user._id !== offer._ownerId ? html `<a href="javascript:void(0)" id="apply-btn">Apply</a>` : null}
  </div>
</div>
</section>`


export async function detailsPage (ctx) {
    const id = ctx.params.id;
    const offer = await getById(id);
    const user = getUserData();
    ctx.render(detailsTemplate(user, offer, onDelete));
    
    async function onDelete() {
        const choice = confirm('Are you sure you want to delete the item?');

        if (choice) {
            await deleteOffer(id);
            ctx.page.redirect('/catalog');
        }
    }
   
}

