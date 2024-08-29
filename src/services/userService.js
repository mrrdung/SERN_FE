import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (idUser) => {
    return axios.get(`/api/get-all-users?id=${idUser}`)
}

export { handleLoginApi, getAllUsers }

