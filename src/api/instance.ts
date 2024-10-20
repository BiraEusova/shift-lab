import axios from 'axios';

//TODO: вынести в константы
const BASE_URL = "https://shift-backend.onrender.com";
export const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use(config => {
    //TODO: надо чтобы этот токен как то в локал сторедже оказался
    //TODO: а ключ выносится в константы?
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
})