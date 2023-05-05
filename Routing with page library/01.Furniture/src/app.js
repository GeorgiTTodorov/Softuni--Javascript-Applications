import page from '/node_modules/page/page.mjs';
import { renderDashboard } from '../views/dashboardView.js';
import { renderCreateView } from '../views/createView.js';
import { renderMyPublications } from '../views/myPublications.js';
import { renderLoginView } from '../views/loginView.js';
import { renderRegisterView } from '../views/registerView.js';
import { renderEditView } from '../views/editView.js';
import { renderDetailsView } from '../views/detailsView.js';
import { logout } from '../views/logoutView.js';

document.getElementById('logoutBtn').addEventListener('click', logout);

export function updateNav () {
    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    if (sessionStorage.getItem('userData')) {
        user.style.display = 'inline';
        guest.style.display = 'none';
    } else {
        user.style.display = 'none';
        guest.style.display = 'inline';
    }
}
updateNav();

page('/', renderDashboard);
page('/create', renderCreateView);
page('/my-furniture', renderMyPublications);
page('/login', renderLoginView);
page('/register', renderRegisterView);
page('/edit/:id', renderEditView);
page('/details/:id', renderDetailsView);


page.start();



