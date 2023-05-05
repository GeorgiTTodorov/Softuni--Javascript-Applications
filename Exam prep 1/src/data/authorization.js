// TODO change user object according to project requirements

import { get, post } from "./api.js";
import { removeUserData, setUserData } from "./utils.js";

const endPoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export async function login (email, password) {
    const result = await post(endPoints.login, {email, password});
    setUserData(result);
} 

export async function register (email, password, username) {
    const result = await post(endPoints.register, {email, password});
    setUserData(result);
}

export function userLogout () {
    get(endPoints.logout);
    removeUserData();
    
}