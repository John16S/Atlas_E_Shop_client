import axios from 'axios'

const instance = axios.create({
    withCredentials: true, //так как авторизация работает через сессии
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
})

export default instance
