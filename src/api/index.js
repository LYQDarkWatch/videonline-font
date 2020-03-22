import axios from "axios";
import {fakeAuth} from '../util/fakeAuth';
import {timeout,baseURL} from "./config.js";
import history from './history';
axios.defaults.timeout = timeout;
axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(
    config => {
        if (fakeAuth.authenticate()) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

