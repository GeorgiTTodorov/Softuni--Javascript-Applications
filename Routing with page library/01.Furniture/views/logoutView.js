import { get } from "../api/api.js";
import { updateNav } from "../src/app.js";
import page from "/node_modules/page/page.mjs";

export async function logout() {
    
    await get('/users/logout');
    sessionStorage.clear();
    updateNav();
    page.redirect('/');
}