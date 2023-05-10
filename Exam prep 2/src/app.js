import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'
import { layOutTemplate } from './views/layout.js';
import { getUserData } from './data/utils.js';
import { loginPage } from './views/loginView.js';
import { registerPage } from './views/registerView.js';
import { userLogout } from './data/authorization.js';
import { catalogPage } from './views/catalogView.js';
import { detailsPgae } from './views/detailsView.js';
import { homePage } from './views/homeView.js';
import { addBookPage } from './views/createBookView.js';
import { editPage } from './views/editBookView.js';
import { myBooksPage } from './views/myBooksView.js';

// TODO change the path depending on project HTML structure
const root = document.getElementById('container');

page(decorateContext);
page('/index.html', '/');
page('/', homePage);
page('/catalog', catalogPage);
page('/create', addBookPage);
page('/details/:id', detailsPgae);
page('/my-books', myBooksPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);

page.start();


function decorateContext (ctx, next) {
    ctx.render = renderView;

    next();
}

// TODO inject dependencies

function renderView (content) {
    
    const userData = getUserData();
    render(layOutTemplate(userData, content), root)
}


function logoutAction (ctx) {
    userLogout();
    ctx.page.redirect('/catalog');
}