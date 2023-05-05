import { post } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { container } from "./dashboardView.js";
import page from '/node_modules/page/page.mjs';

const createViewTemplate = () => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${createFurniture}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`

export function renderCreateView() {
    render(createViewTemplate(),container )
}

function createFurniture(event) {
    event.preventDefault();
    
    const make = document.getElementById('new-make');
    const model = document.getElementById('new-model');
    const year = document.getElementById('new-year');
    const description = document.getElementById('new-description');
    const price = document.getElementById('new-price');
    const image = document.getElementById('new-image');
    const material = document.getElementById('new-material');
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
        post(`/data/catalog`, data);
        page.redirect('/');
    }
    
}

