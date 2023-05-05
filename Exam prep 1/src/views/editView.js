import {html} from '../../node_modules/lit-html/lit-html.js';
import { editOffer, getById } from '../data/offers.js';
import { createSubmitHandler } from '../data/utils.js';


const editTemplate = (data, onSubmit) => html `<section id="edit">
<div class="form">
  <h2>Edit Offer</h2>
  <form class="edit-form" @submit=${onSubmit}>
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      .value=${data.title}
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      .value = ${data.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      .value = ${data.category}
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
      .value = ${data.description}
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
      .value = ${data.requirements}
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      .value = ${data.salary}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const data = await getById(id);
    
    ctx.render(editTemplate(data, createSubmitHandler(onSubmit)));

    async function onSubmit({title, imageUrl, category, description, requirements, salary}) {

        if (title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == '') {
            return alert('All fields are required')
        }
        
        await editOffer(id, {title, imageUrl, category, description, requirements, salary});
        ctx.page.redirect(`/details/${id}`);
    }
}