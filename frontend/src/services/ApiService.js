import axios from 'axios';

const ApiService = axios.create({
    baseURL: 'http://127.0.0.1:8001/'
});


export default ApiService;