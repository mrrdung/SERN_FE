import actionTypes from "./actionTypes";
import {
    getAllcodesService,
    addNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveInfoDoctor,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fecthGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fecthGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });

            let res = await getAllcodesService("gender");
            if (res && res.errCode === 0) {
                dispatch(fecthGenderSuccess(res.data));
            } else {
                dispatch(fecthGenderFail());
            }
        } catch (e) {
            dispatch(fecthGenderFail());
            console.log(e);
        }
    };
};
export const fecthGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAL,
});

export const fecthGenderSuccess = genderData => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
// position
export const fecthPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodesService("position");
            if (res && res.errCode === 0) {
                dispatch(fecthPositionSuccess(res.data));
            } else {
                dispatch(fecthPositionFail());
            }
        } catch (e) {
            console.log(e);

            dispatch(fecthPositionFail());
        }
    };
};

export const fecthPositionSuccess = positionData => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fecthPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED,
});
// role
export const fecthRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodesService("role");
            if (res && res.errCode === 0) {
                dispatch(fecthRoleSuccess(res.data));
            } else {
                dispatch(fecthRoleFail());
            }
        } catch (e) {
            console.log(e);

            dispatch(fecthRoleFail());
        }
    };
};

export const fecthRoleSuccess = roleData => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fecthRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED,
});
export const createNewUser = data => {
    return async (dispatch, getState) => {
        try {
            let res = await addNewUserService(data);

            if (res && res.errCode === 0) {
                toast.success("CREATE NEW USER SUCCESS");
                dispatch(createNewUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(createNewUserFail());
            }
        } catch (e) {
            dispatch(createNewUserFail());
            console.log(e);
        }
    };
};
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_FAILDED,
});

export const createNewUserFail = () => ({
    type: actionTypes.CREATE_USER_FAILDED,
});
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFail());
            }
        } catch (e) {
            dispatch(fetchAllUserFail());
            console.log(e);
        }
    };
};
export const fetchAllUserSuccess = data => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    user: data,
});
export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILDED,
});
//delete\
export const deleteUserStart = userID => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userID);
            if (res && res.errCode === 0) {
                toast.success("Deleteok");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteUserFail());
            }
        } catch (e) {
            dispatch(deleteUserFail());
            console.log(e);
        }
    };
};
export const deleteUserSuccess = data => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAILDED,
});

//update
export const updateUserStart = data => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            console.log("check res", res);

            if (res && res.errCode === 0) {
                toast.success("update user ok");
                dispatch(updateUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("up date user error k ok");
                dispatch(updateUserFail());
            }
        } catch (e) {
            toast.error("up date user error");
            dispatch(updateUserFail());
            console.log(e);
        }
    };
};
export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
});
export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAILDED,
});

export const fetchTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService("4");
            console.log("check responsse", res);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFail());
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchTopDoctorFail());
        }
    };
};
export const fetchTopDoctorSuccess = data => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctors: data,
});
export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
});

export const fetchAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDR: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
                });
            }
        } catch (e) {
            console.log("FETCH_ALL_DOCTOR_FAILDED", e);
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILDED });
        }
    };
};

export const saveInfoDoctorStart = data => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInfoDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Save Info Doctor ok");
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
                });
            } else {
                toast.error("Save Info Doctor Error");
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_FAILDED,
                });
            }
        } catch (e) {
            console.log("SAVE_INFO_DOCTOR_FAILDED", e);
            toast.error("Save Info Doctor Error");
            dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_FAILDED });
        }
    };
};
export const fetchAllCodeTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodesService("TIME");
            console.log("check responsse-doc", res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILDED,
                });
            }
        } catch (e) {
            console.log("FETCH_ALLCODE_SCHEDULE_HOURS_FAILDED", e);
            dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILDED });
        }
    };
};
