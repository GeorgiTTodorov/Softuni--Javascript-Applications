import { html, render } from "../node_modules/lit-html/lit-html.js";
import {get} from '../api/api.js'

const container = document.querySelector('.container');

const dashboardTemplate = (data) => html `
<div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
        ${data.map(el => html `
            <div class="col-md-4">
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
                </div>
            </div>`)}
            </div>`

       async function renderDashboard () {
            const data = await get('/data/catalog');
            render(dashboardTemplate(data), container)
       }

       export {renderDashboard, container}