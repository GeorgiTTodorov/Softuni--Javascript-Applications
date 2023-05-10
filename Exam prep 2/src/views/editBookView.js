import {html} from '../../node_modules/lit-html/lit-html.js';
import { put } from '../data/api.js';
import { loadBookById } from '../data/books.js';
import { createSubmitHandler } from '../data/utils.js';

const editBookTemplate = (data, onSubmit) => html ` <section id="edit-page" class="edit">
<form id="edit-form" action="#" method="" @submit=${onSubmit}>
    <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" value="${data.title}">
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                    id="description">${data.description}</textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" value="${data.imageUrl}">
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" value="${data.type}">
                    <option value="Fiction" >Fiction</option>
                    <option value="Romance" >Romance</option>
                    <option value="Mistery" >Mistery</option>
                    <option value="Classic" >Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>`


export async function editPage (ctx) {
    const book = ctx.params.id;
    const data = await loadBookById(book);
    ctx.render(editBookTemplate(data, createSubmitHandler(onSubmit)));

    async function onSubmit({title, description, imageUrl, type}) {

        if (title == '' || description == '' || imageUrl == '' || type == '') {
            return alert('All fields are required')
         }
         await put(`/data/books/${book}`, {title, description, imageUrl, type});
         ctx.page.redirect(`/details/${book}`);
    }
}