const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
    SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
    CHANGEL_ANGUAGES: "CHANGEL_ANGUAGES",

    //user
    ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
    USER_LOGIN_FAILDED: "USER_LOGIN_FAILDED",
    USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
    PROCESS_LOGOUT: "PROCESS_LOGOUT",

    //admin
    FETCH_GENDER_START: "FETCH_GENDER_START",
    FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
    FETCH_GENDER_FAILDED: "FETCH_GENDER_FAILDED",
    //admin-position
    FETCH_POSITION_START: "FETCH_POSITION_START",
    FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
    FETCH_POSITION_FAILDED: "FETCH_POSITION_FAILDED",
    //admin-role
    FETCH_ROLE_START: "FETCH_ROLE_START",
    FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
    FETCH_ROLE_FAILDED: "FETCH_ROLE_FAILDED",

    //create new
    CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
    CREATE_USER_FAILDED: "CREATE_USER_FAILDED",
    //read
    FETCH_ALL_USER_SUCCESS: "FETCH_ALL_USER_SUCCESS",
    FETCH_ALL_USER_FAILDED: "FETCH_ALL_USER_FAILDED",
    //delete
    DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
    DELETE_USER_FAILDED: "DELETE_USER_FAILDED",
    //delete
    UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
    UPDATE_USER_FAILDED: "UPDATE_USER_FAILDED",
    FETCH_TOP_DOCTOR_SUCCESS: "FETCH_TOP_DOCTOR_SUCCESS",
    FETCH_TOP_DOCTOR_FAILDED: "FETCH_TOP_DOCTOR_FAILDED",
    //doctor
    FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
    FETCH_ALL_DOCTOR_FAILDED: "FETCH_ALL_DOCTOR_FAILDED",
    //doctor
    SAVE_INFO_DOCTOR_SUCCESS: "SAVE_INFO_DOCTOR_SUCCESS",
    SAVE_INFO_DOCTOR_FAILDED: "SAVE_INFO_DOCTOR_FAILDED",

    FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS: "FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS",
    FETCH_ALLCODE_SCHEDULE_HOURS_FAILDED: "FETCH_ALLCODE_SCHEDULE_HOURS_FAILDED",
    FETCH_REQUIRE_DOCTOR_INFO_START: "FETCH_REQUIRE_DOCTOR_INFO_START",
    FETCH_REQUIRE_DOCTOR_INFO_FAILDED: "FETCH_REQUIRE_DOCTOR_INFO_FAILDED",
    FETCH_REQUIRE_DOCTOR_INFO_SUCCESS: "FETCH_REQUIRE_DOCTOR_INFO_SUCCESS",
});

export default actionTypes;
