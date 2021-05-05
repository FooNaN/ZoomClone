import axios from "axios";

const $host = axios.create({
    baseURL: `http://localhost:5000/`
})

const $authHost = axios.create({
    baseURL: `http://localhost:9000/`
})

// const authInterceptor = config => {
//     config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))?.access}`
//     return config
// }

// $authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}