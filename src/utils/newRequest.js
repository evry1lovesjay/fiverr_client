import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:9900/api/",
    withCredentials: true,
})

// const newRequest = axios.create({
//     baseURL: "http://localhost:9900/api/",
//     withCredentials: true,
// })

export default newRequest