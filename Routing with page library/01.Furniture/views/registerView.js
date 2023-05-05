import { post } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { updateNav } from "../src/app.js";
import { container } from "./dashboardView.js";
import page from '/node_modules/page/page.mjs'

const registerViewTemplate = () => html ` <div class="row space-top">
<div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @click=${onSubmit}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class="form-control" id="email" type="text" name="email">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class="form-control" id="password" type="password" name="password">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="rePass">Repeat</label>
            <input class="form-control" id="rePass" type="password" name="rePass">
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
    </div>
</div>
</form>`

export function renderRegisterView() {
    render(registerViewTemplate(), container);
}

export async function onSubmit (event) {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (event.target.value === 'Register') {
        const formData = new FormData(form);
        const {email, password, rePass} = Object.fromEntries(formData);

    if (!email || !password) {
        return alert('All fields are required');
    }
    if (password !== rePass) {
        return alert('Passwords must match');
    }

    const data = await post('/users/register', {email, password});
    
    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));
    updateNav();
    page.redirect('/');
    }
}