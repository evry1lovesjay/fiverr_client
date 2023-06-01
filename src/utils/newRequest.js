import axios from "axios";


// const API_URL = import.meta.env.DEV
// ? 'http://localhost:3000'
// : 'https://www.daytrit.com';


// const newRequest = axios.create({
//     baseURL: "http://localhost:9900/api/",
//     withCredentials: true,
// })

const API_URL = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;


const newRequest = axios.create({
    baseURL: `${API_URL}/api/`,
    withCredentials: true,
})

export default newRequest