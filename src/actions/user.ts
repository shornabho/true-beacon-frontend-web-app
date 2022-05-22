import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import * as api from "../api/user";
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

// Action Creators

export const registerUser =
    (username: string, name: string, password: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: REGISTERING_USER, payload: true });

            const { data } = await api.registerUser(username, name, password);

            dispatch({ type: REGISTERING_USER, payload: false });
            dispatch({ type: REGISTER_SUCCESS, payload: data.data });

            navigate("/");
        } catch (error) {
            dispatch({ type: REGISTER_FAILURE, payload: error });
        }
    };

export const loginUser =
    (username: string, password: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
        try {
            dispatch({ type: LOGGING_IN_USER, payload: true });

            const { data } = await api.loginUser(username, password);

            dispatch({ type: LOGGING_IN_USER, payload: false });
            dispatch({ type: LOGIN_SUCCESS, payload: data.data });

            navigate("/");
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error });
        }
    };

export const logoutUser = (navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    dispatch({ type: LOGOUT_USER, payload: null });
    navigate("/login");
};

export const getUserProfile = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: USER_PROFILE_LOADING, payload: true });

        const { data } = await api.getUserProfile();

        dispatch({ type: USER_PROFILE_LOADING, payload: false });
        dispatch({ type: USER_PROFILE_LOAD_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: USER_PROFILE_LOAD_FAILURE, payload: error });
    }
};
