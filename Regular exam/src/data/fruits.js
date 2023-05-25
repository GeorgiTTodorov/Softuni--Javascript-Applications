import { del, get, post, put } from "./api.js"

const endpoints = {
    listAllFruits: '/data/fruits?sortBy=_createdOn%20desc',
    listFruitById: '/data/fruits/',
    createFruit: '/data/fruits',
    getFruit: '/data/fruits'
}

export async function getAllFruits() {
    const data = await get(endpoints.listAllFruits);
    return data;
}

export async function createFruit(data) {
    await post(endpoints.createFruit, data);
}

export async function getFruitById(fruitId) {
   const fruit = await get(endpoints.listFruitById + fruitId);
   return fruit;
}

export async function deleteFruit(fruitId) {
    return del(endpoints.listFruitById + fruitId);
}

export async function updateFruit(fruitId, data) {
    await put(endpoints.listFruitById + fruitId, data);
}

export async function searchFruit(url) {
    const fruits = await get(endpoints.getFruit + url);
    return fruits;
}