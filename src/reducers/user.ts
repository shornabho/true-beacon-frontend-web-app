import {
    LOGGING_IN_USER,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    REGISTERING_USER,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    USER_PROFILE_LOADING,
    USER_PROFILE_LOAD_FAILURE,
    USER_PROFILE_LOAD_SUCCESS,
} from "../constants/actionTypes";

const initialState = {
    user: JSON.parse(localStorage.getItem("user") || "{}"),
};

const userReducer = (userData = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        // AUTHENTICATING USER
        case REGISTERING_USER:
        case LOGGING_IN_USER:
            return { ...userData, userLoading: action.payload };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { ...userData, user: action.payload };
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            alert(action.payload.response.data.detail);
            return { ...userData, userError: action.payload };

        case LOGOUT_USER:
            localStorage.removeItem("user");
            return { ...userData, user: undefined };

        // USER PROFILE
        case USER_PROFILE_LOADING:
            return { ...userData, userProfileLoading: action.payload };
        case USER_PROFILE_LOAD_SUCCESS:
            return { ...userData, userProfile: action.payload };
        case USER_PROFILE_LOAD_FAILURE:
            return { ...userData, userProfileError: action.payload };

        default:
            return userData;
    }
};

export default userReducer;
