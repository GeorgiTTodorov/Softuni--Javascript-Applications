import {html} from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../data/utils.js';
import {createOffer} from '../data/offers.js'

const createOfferTemplate = (onSubmit) => html `<section id="create">
<div class="form">
  <h2>Create Offer</h2>
  <form class="create-form" @submit=${onSubmit}>
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`


export function addNewOffer(ctx) {
    ctx.render(createOfferTemplate(createSubmitHandler(onSubmit)));

    async function onSubmit({title, imageUrl, category, description, requirements, salary}) {
            if (title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == '') {
                return alert('All fields are required')
            }
            createOffer({title, imageUrl, category, description, requirements, salary});
            ctx.page.redirect('/catalog');
    }

}