import { post } from "../api/api.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { updateNav } from "../src/app.js";
import { container } from "./dashboardView.js";
import page from '/node_modules/page/page.mjs';

const loginViewTemplate = () => html ` <div class="row space-top">
<div class="col-md-12">
    <h1>Login User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @click=${login}>
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
        <input type="submit" class="btn btn-primary" value="Login" />
    </div>
</div>
</form>`

export function renderLoginView() {
    render(loginViewTemplate(), container)
}

export async function login(event) {
    event.preventDefault();
    if (event.target.value === 'Login') {
        const form = event.currentTarget;
    const formData = new FormData(form);
    const {email, password} = Object.fromEntries(formData);
    const data = await post('/users/login', {email, password})

    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken
    }
    sessionStorage.setItem('userData', JSON.stringify(userData));
    updateNav();
    page.redirect('/')
    }
}