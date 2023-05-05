import { get } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { container } from "./dashboardView.js";
import {deleteFurniture} from './deleteView.js'

const detailsViewTemplate = (data) => html `<div class="row space-top">
<div class="col-md-12">
    <h1>Furniture Details</h1>
</div>
</div>
<div class="row space-top">
    ${html `
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${data.img.includes('http') ? data.img : `.${data.img}`} />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>${data.price}</span></p>
                <p>Material: <span>${data.material}</span></p>
                <div>
                    ${data._ownerId == JSON.parse(sessionStorage.getItem('userData')).id ? html `<a href="/edit/${data._id}" class="btn btn-info">Edit</a>
                    <a href="javascript:void(0)" class="btn btn-red" id=${data._id} @click=${deleteFurniture}>Delete</a>` : null}
                    
                </div>
            </div>
        `}
</div>`

export async function renderDetailsView(context) {
    
    const data = await getDetailsId(context.params.id);
    
    render(detailsViewTemplate(data), container);
}

async function getDetailsId (id) {
    return await get(`/data/catalog/${id}`)
}