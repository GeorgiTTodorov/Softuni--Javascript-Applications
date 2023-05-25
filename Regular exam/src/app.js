import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'
import { layOutTemplate } from './views/layout.js';
import { getUserData } from './data/utils.js';
import { homePage } from './views/homeView.js';
import { loginPage } from './views/loginView.js';
import { registerPage } from './views/registerView.js';
import { userLogout } from './data/authorization.js';
import { catalogPage } from './views/catalogView.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/detailsView.js';
import { editPage } from './views/editView.js';
import { searchPage } from './views/searchView.js';


const root = document.getElementById('wrapper');

page(decorateContext);
page('/index.html', '/');
page('/', homePage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage)
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);

page.start();


function decorateContext (ctx, next) {
    ctx.render = renderView;

    next();
}


function renderView (content) {
    
    const userData = getUserData();
    render(layOutTemplate(userData, content), root)
}


function logoutAction (ctx) {
    userLogout();
    ctx.page.redirect('/');
}