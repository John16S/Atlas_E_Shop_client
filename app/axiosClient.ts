import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,//так как авторизация работает через сессии
})

export default instance
