import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    position: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let coppyState = { ...state };
            coppyState.isLoadingGender = true;
            // console.log('dung fire fetch gender start', action);
            return {
                ...coppyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log('dung fire fetch gender sUCCESS', action);
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILDED:
            state.isLoadingGender = false;
            state.genders = [];

            return {
                ...state,
            }
        //position
        case actionTypes.FETCH_POSITION_SUCCESS:
            let coppyState1 = { ...state };
            coppyState1.position = action.data;
            return {
                ...coppyState1,
            }
        case actionTypes.FETCH_POSITION_FAILDED:
            state.position = [];
            return {
                ...state,
            }
        //roleid
        case actionTypes.FETCH_ROLE_SUCCESS:

            let coppyState2 = { ...state };
            coppyState2.roles = action.data;
            return {
                ...coppyState2,
            }
        case actionTypes.FETCH_ROLE_FAILDED:
            state.roles = [];
            return {
                ...state,
            }
        //Fetch all user
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.user;

            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILDED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            console.log('dung fire FETCH_TOP_DOCTOR_SUCCESS', action);
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
            state.topDoctors = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;