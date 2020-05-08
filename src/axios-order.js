import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-db-9d85d.firebaseio.com/'
});

export default instance;