import { del } from "../api/api.js";
import page from '/node_modules/page/page.mjs';

export function deleteFurniture(event) {
    const confirmation = confirm('Are you sure you want to delete that item?');

    if (confirmation) {
        const id = event.target.id;
        del(`/data/catalog/${id}`);
        page.redirect('/')
    }
 
}