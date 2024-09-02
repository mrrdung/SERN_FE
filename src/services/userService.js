import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (idUser) => {
    return axios.get(`/api/get-all-users?id=${idUser}`)
}
const addNewUserService = (data) => {

    return axios.post('/api/create-users', data)
}
const deleteUserService = (userId) => {
    return axios.delete("/api/delete-users", {
        data: {
            id: userId
        }
    });
}
const editUserService = (userId) => {
    return axios.put('/api/update-users', userId)
}



export { handleLoginApi, getAllUsers, addNewUserService, deleteUserService, editUserService }

