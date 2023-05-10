import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/authorization.js';
import { createSubmitHandler } from '../data/utils.js';


// TODO replace with actual register
const registerViewTemplate = (onRegister) => html `
<section id="register-page" class="register">
            <form id="register-form" @submit=${onRegister} action="" method="">
                <fieldset>
                    <legend>Register Form</legend>
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
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>`;



export function registerPage (ctx) {
    ctx.render(registerViewTemplate(createSubmitHandler(onRegister)))

    //TODO replace with actual data
    async function onRegister({email, password, ['confirm-pass'] : rePass}) {
        if (email == '' || password == '' || rePass == '') {
            return alert('All fields are required')
        }
        if (password !== rePass) {
            return alert('Passwords must match')
        }

        await register(email, password);

        //TODO change redirect location based on requirements
        ctx.page.redirect('/catalog');
    }
}

