import { get, post, put, del } from "./api.js";


const endPoints = {
    catalog: '/data/offers?sortBy=_createdOn%20desc',
    byID: '/data/offers/',
    applications: '/data/applications'

}

export async function getAllOffers() {
    return get(endPoints.catalog)
}

export async function getById(id) {
    return get(endPoints.byID + id);
}

export async function createOffer(data) {
    return post(endPoints.catalog, data)
}

export async function editOffer(id, data) {
    return put(endPoints.byID + id, data)
}

export async function deleteOffer(id) {
    return del(endPoints.byID + id)
}

export async function newApplication(data) {
    return post(endPoints.applications, data)
}