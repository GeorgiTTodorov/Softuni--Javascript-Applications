import { put, get } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { container } from "./dashboardView.js";
import page from '/node_modules/page/page.mjs';

const editViewTemplate = (data) => html ` <div class="row space-top">
<div class="col-md-12">
    <h1>Edit Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onSubmit} id=${data._id}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class="form-control" id="new-make" type="text" name="make" value="${data.make}">
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class="form-control is-valid" id="new-model" type="text" name="model" value="${data.model}">
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class="form-control is-invalid" id="new-year" type="number" name="year" value="${data.year}">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class="form-control" id="new-description" type="text" name="description" value="${data.description}">
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class="form-control" id="new-price" type="number" name="price" value="${data.price}">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class="form-control" id="new-image" type="text" name="img" value="${data.img}">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control" id="new-material" type="text" name="material" value="${data.material}">
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
    </div>
</div>
</form>`

export async function renderEditView(context) {
    const data = await get(`/data/catalog/${context.params.id}`);

    render(editViewTemplate(data), container);
}

function onSubmit(event) {
    event.preventDefault();
   
    const make = document.getElementById('new-make');
    const model = document.getElementById('new-model');
    const year = document.getElementById('new-year');
    const description = document.getElementById('new-description');
    const price = document.getElementById('new-price');
    const image = document.getElementById('new-image');
    const material = document.getElementById('new-material');
    const id = document.querySelector('form').id;
    let isValid = true;

    make.value.length >= 4 ? validator(make, true) : validator(make, false);
    model.value.length >= 4 ? validator(model, true) : validator(model, false);
    Number(price.value) > 0 ? validator(price, true) : validator(price, false);
    Number(year.value) >= 1950 && Number(year.value) <= 2050 ? validator(year, true) : validator(year, false);
    image.value !== '' ? validator(image, true) : validator(image, false);
    description.value.length > 10 ? validator(description, true) : validator(description, false);

    let data = {
        make: make.value,
        model: model.value,
        year: year.value,
        description: description.value,
        price: price.value,
        img: image.value,
        material: material.value
    }

    function validator (element, boolean) {
        const IS_INVALID = 'is-invalid';
        const IS_VALID = 'is-valid';
        if (boolean == false) {
            isValid = false;
            element.classList.add(IS_INVALID);
            element.classList.remove(IS_VALID);
        } else {
            element.classList.add(IS_VALID);
            element.classList.remove(IS_INVALID);
        }
    }

    if (isValid) {
        put(`/data/catalog/${id}`, data);
        page.redirect('/');
    }

}