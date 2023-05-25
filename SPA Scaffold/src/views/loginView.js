import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/authorization.js';
import { createSubmitHandler } from '../data/utils.js';

// TODO replace with actual login
const loginViewTemplate = (onLoogin) => html `
<h1>Login Page</h1>
<form @submit=${onLoogin}>
<label >Email<input type="text" name='email'></label>
<label >Password<input type="password" name='password'></label>
<button>Login</button>
</form>`


export function loginPage(ctx) {
    ctx.render(loginViewTemplate(createSubmitHandler(onLogin)));

    // TODO change data object based on requirements
    async function onLogin({email, password}) {
        await login(email, password)

        // TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}