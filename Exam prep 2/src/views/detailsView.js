import {html} from '../../node_modules/lit-html/lit-html.js';
import { del } from '../data/api.js';
import { getLikedBooksId, getMyLikedBooks, likeBook, loadBookById } from '../data/books.js';
import { getUserData } from '../data/utils.js';

const detailsTemplate = (data, user, id, onDelete, likes, myLikes, isOwner, showLikeButton, onLike) => html `<section id="details-page" class="details">
<div class="book-information">
    <h3>${data.title}</h3>
    <p class="type">Type: ${data.type}</p>
    <p class="img"><img src=${data.imageUrl}></p>
    <div class="actions">
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
        ${user && user._id == id ? html `<a class="button" href="/edit/${data._id}">Edit</a>
        <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>` : null}

        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        ${showLikeButton ? html `<a class="button" href="javascript:void(0)" @click=${onLike}>Like</a>` : null}

        <!-- ( for Guests and Users )  -->
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${likes}</span>
        </div>
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${data.description}</p>
</div>
</section>`

export async function detailsPgae(ctx) {
    const data = await loadBookById(ctx.params.id);
    const user = getUserData();

    // unnecessary additional variables for the like functionality
    const userId = getUserData()?._id;
    const bookId = ctx.params.id;
    const id = data._ownerId;
    const isOwner = id == userId;
    const likes = await getLikedBooksId(bookId);
    const myLikes = await getMyLikedBooks(bookId, userId);
    const showLikeButton = !isOwner && !myLikes && userId;

    ctx.render(detailsTemplate(data, user, id, onDelete, likes, myLikes, isOwner, showLikeButton, onLike));

    function onDelete() {
        const choice = confirm('Are you sure you want to delete that book?');

        if (choice) {
            del(`/data/books/${data._id}`);
            ctx.page.redirect('/catalog')
        }
    }

    async function onLike() {
        await likeBook(bookId);
        ctx.page.redirect(`/details/${bookId}`);
    }
}


