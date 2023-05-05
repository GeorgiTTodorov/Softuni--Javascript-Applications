const host = 'http://localhost:3030';

async function requester(method, url, data) {

    const options = {
        method,
        headers: {}
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(`${host}${url}`, options);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }
        return response.status === 204 ? response : await response.json();
        
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

const get = requester.bind(null, 'GET');
const post = requester.bind(null, 'POST');
const put = requester.bind(null, 'PUT');
const del = requester.bind(null, 'DELETE');

export {get, post, put, del}