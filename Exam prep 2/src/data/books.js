import { get, post } from "./api.js";

const endPoints = {
    getBooks: '/data/books?sortBy=_createdOn%20desc',
    getBookById: '/data/books/',
    like: '/data/likes'
}

export async function loadAllBooks () {
    const data = await get(endPoints.getBooks);
    return data;
}

export async function loadBookById (id) {
    const data = await get(endPoints.getBookById + id);
    return data;
}

export async function likeBook (bookId) {
    return post(endPoints.like, {bookId});
}

export async function getLikedBooksId(id) {
    return get(endPoints.like + `?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function getMyLikedBooks(bookId, userId) {
    return get(endPoints.like + `?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}