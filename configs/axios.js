import axios from "axios";


const apiService = axios.create({
    baseURL: 'https://dummyjson.com'
})

apiService.interceptors.request.use(
    (config) => {
        let token
        if (localStorage.getItem("UserData")) {
            token = JSON.parse(localStorage.getItem("UserData")).token
        } else {
            token = false
        }

        if (config.headers.Authorization) {
            if (config.headers['Authorization'] === "NpToken") { }
        } else {
            config.headers.Authorization = `${token}`
        }

        if (config.headers['Content-Type'] === 'multipart/form-data') {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json'
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiService