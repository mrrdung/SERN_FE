import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
};

const getAllUsers = idUser => {
    return axios.get(`/api/get-all-users?id=${idUser}`);
};
const addNewUserService = data => {
    return axios.post("/api/create-users", data);
};
const deleteUserService = userId => {
    return axios.delete("/api/delete-users", {
        data: {
            id: userId,
        },
    });
};
const editUserService = userId => {
    return axios.put("/api/update-users", userId);
};

const getAllcodesService = inputType => {
    return axios.get(`/api/allcodes?type=${inputType}`);
};

const getTopDoctorHomeService = limit => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`);
};

const getAllDoctors = () => {
    return axios.get(`/api/get-top-doctor`);
};
const saveInfoDoctor = data => {
    return axios.post("/api/post-info-doctor", data);
};
const getDetailInforDoctor = inputId => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = data => {
    return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
const getExtraInforDoctorById = doctorId => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileInforDoctorById = doctorId => {
    return axios.get(`/api/get-profile-infor-doctor-by-id?doctorId=${doctorId}`);
};
const postBookAppoitment = data => {
    return axios.post("/api/post-book-appointment", data);
};

const postVerifyBookAppointment = data => {
    return axios.post("/api/verify-book-appointment", data);
};

export {
    handleLoginApi,
    getAllUsers,
    addNewUserService,
    deleteUserService,
    editUserService,
    getAllcodesService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveInfoDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileInforDoctorById,
    postBookAppoitment,
    postVerifyBookAppointment,
};
