import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/authorization.js';
import { createSubmitHandler } from '../data/utils.js';


// TODO replace with actual register
const registerViewTemplate = (onRegister) => html `
<h1>Register form</h1>
<form @click=${onRegister}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>RepeatPassword: <input type="password" name="rePass"></label>
</form>`;



export function registerPage (ctx) {
    ctx.render(registerViewTemplate(createSubmitHandler(onRegister)))

    //TODO replace with actual data
    async function onRegister({email, password, rePass}) {
        if (email == '' || password == '') {
            return alert('All fields are required')
        }
        if (password !== rePass) {
            return alert('Passwords must match')
        }

        await register(email, password);

        //TODO change redirect location based on requirements
        ctx.page.redirect('/');
    }
}

