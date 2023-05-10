import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/authorization.js';
import { createSubmitHandler } from '../data/utils.js';


// TODO replace with actual login
const loginViewTemplate = (onLoogin) => html `
<section id="login-page" class="login">
<form id="login-form" @submit=${onLoogin} action="" method="">
    <fieldset>
        <legend>Login Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Login">
    </fieldset>
</form>
</section>
`


export function loginPage(ctx) {
    ctx.render(loginViewTemplate(createSubmitHandler(onLogin)));

    // TODO change data object based on requirements
    async function onLogin({email, password}) {
        if (email == '' || password == '') {
            return alert('All fields are required')
        }
        await login(email, password)

        // TODO use redirect location from requirements
        ctx.page.redirect('/catalog');
    }
}