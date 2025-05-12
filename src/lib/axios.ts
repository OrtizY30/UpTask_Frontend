import axios from 'axios'

// api es una instancia de axios que se utiliza para hacer peticiones a la API
// y se configura con la URL base de la API
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token) {
        config.headers.Authorization =  `Bearer ${token}`
    }
    return config
})

export default api