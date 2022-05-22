import { Dispatch } from "redux";

import * as api from "../api/historicalData";
import {
    HISTORICAL_DATA_DATE_LIMITS_LOADING,
    HISTORICAL_DATA_DATE_LIMITS_LOADING_FAILURE,
    HISTORICAL_DATA_DATE_LIMITS_LOADING_SUCCESS,
    HISTORICAL_DATA_LOADING,
    HISTORICAL_DATA_LOADING_FAILURE,
    HISTORICAL_DATA_LOADING_SUCCESS,
    HISTORICAL_DATA_SYMBOLS_LOADING,
    HISTORICAL_DATA_SYMBOLS_LOADING_FAILURE,
    HISTORICAL_DATA_SYMBOLS_LOADING_SUCCESS,
} from "../constants/actionTypes";

// Action Creators

export const getHistoricalData = (symbol: string, from_date: Date, to_date: Date) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: HISTORICAL_DATA_LOADING, payload: true });

        const { data } = await api.getHistoricalData(symbol, from_date, to_date);

        dispatch({ type: HISTORICAL_DATA_LOADING, payload: false });
        dispatch({ type: HISTORICAL_DATA_LOADING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HISTORICAL_DATA_LOADING_FAILURE, payload: error });
    }
};

export const getHistoricalDataSymbols = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: HISTORICAL_DATA_SYMBOLS_LOADING, payload: true });

        const { data } = await api.getHistoricalDataSymbols();

        dispatch({ type: HISTORICAL_DATA_SYMBOLS_LOADING, payload: false });
        dispatch({ type: HISTORICAL_DATA_SYMBOLS_LOADING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HISTORICAL_DATA_SYMBOLS_LOADING_FAILURE, payload: error });
    }
};

export const getHistoricalDataDateLimits = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: HISTORICAL_DATA_DATE_LIMITS_LOADING, payload: true });

        let { data } = await api.getHistoricalDataDateLimits();

        data = { minDate: new Date(data.minDate), maxDate: new Date(data.maxDate) };

        dispatch({ type: HISTORICAL_DATA_DATE_LIMITS_LOADING, payload: false });
        dispatch({ type: HISTORICAL_DATA_DATE_LIMITS_LOADING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HISTORICAL_DATA_DATE_LIMITS_LOADING_FAILURE, payload: error });
    }
};
