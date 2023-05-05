import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/authorization.js';
import { createSubmitHandler } from '../data/utils.js';


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

    
    async function onLogin({email, password}) {

        if (email == '' || password == '') {
            return alert('All fields are required')
        }
        await login(email, password)

       
        ctx.page.redirect('/catalog');
    }
}