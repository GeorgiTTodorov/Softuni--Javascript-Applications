import { getUserData, removeUserData } from "./utils.js"

const host = 'http://localhost:3030'


async function requestHandler (method, url, data) {
    const options = {
        method,
         headers: {}
    }
    const userData = getUserData();

    if (userData) {
        const token = userData.accessToken;
        options.headers['X-Authorization'] = token;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);
        let result;
        
        if (response.status != 204) {
            result = await response.json()
        }

        if (!response.ok) {

            if (response.status == 403) {
                removeUserData();
            }

            const error = await response.json();
            throw error.message;
        }


        return result;
        
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

const get = requestHandler.bind(null, 'get');
const post = requestHandler.bind(null, 'post');
const put = requestHandler.bind(null, 'put');
const del = requestHandler.bind(null, 'delete');

export {get, post, put, del};