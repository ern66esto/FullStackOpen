import axios from 'axios';
//const baseUrl = 'http://localhost:3001/api/persons';
const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => {return response.data});
}

const create = (newObject) => {
    const request =  axios.post(baseUrl, newObject);
    return request.then((response) => {
        return response.data
    }).catch(error => {
        console.log(error.response.data.error);
        throw new Error(error.response.data.error
        );
    });
}

const update = (id, newObject) => {
    const request =  axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => {
        return response.data
    }).catch(error => {
        console.log(error.response.data.error);
        throw new Error(error.response.data.error);
    });
}


const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => {
        const deletedResourceHeader = response.headers['x-deleted-resource'];
        return deletedResourceHeader
    });
}


export default {getAll, create, update, remove}