import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/authorization.js';
import { createSubmitHandler } from '../data/utils.js';

// TODO replace with actual login
const loginViewTemplate = (onLoogin) => html `
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLoogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>`


export function loginPage(ctx) {
    ctx.render(loginViewTemplate(createSubmitHandler(onLogin)));

    // TODO change data object based on requirements
    async function onLogin({email, password}) {
        if (email == '' || password == '') {
            return alert('All fields are required')
        }
        
        await login(email, password)

        // TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}