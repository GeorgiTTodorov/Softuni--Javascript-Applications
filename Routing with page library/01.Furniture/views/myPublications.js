import { get } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { container } from "./dashboardView.js";

const myPublicationsTemplate = (data) => html `<div class="row space-top">
<div class="col-md-12">
    <h1>My Furniture</h1>
    <p>This is a list of your publications.</p>
</div>
</div>
<div class="row space-top">
    ${data.map(el => html `<div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${el.img}" />
                            <p>${el.description}</p>
                            <footer>
                                <p>Price: <span>${el.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${el._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>`)}
</div>`

export async function renderMyPublications () {
    
    const data = await get (`/data/catalog`);
    console.log(data);

    render(myPublicationsTemplate(data.filter(el => el._ownerId === JSON.parse(sessionStorage.getItem('userData')).id)), container);
}