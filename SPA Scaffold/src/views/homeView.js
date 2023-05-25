import {html} from '../../node_modules/lit-html/lit-html.js';

// TODO replace with actual home page
const homeViewTemplate = () => html `
<h1>Home Page</h1>
<p>Welcome to our site</p>`



export function homePage(ctx) {
    ctx.render(homeViewTemplate());
}