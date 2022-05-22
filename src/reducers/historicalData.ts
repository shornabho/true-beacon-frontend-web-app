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

const historicalDataReducer = (historicalData = {}, action: { type: string; payload: any }) => {
    switch (action.type) {
        // HISTORICAL DATA
        case HISTORICAL_DATA_LOADING:
            return { ...historicalData, dataLoading: action.payload };
        case HISTORICAL_DATA_LOADING_SUCCESS:
            const data = action.payload.map(
                (datapoint: { price: number; date: string; id: number; symbol: string }) => {
                    const date = new Date(datapoint.date);
                    return {
                        ...datapoint,
                        date: new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay()).getTime(),
                    };
                }
            );
            return { ...historicalData, data };
        case HISTORICAL_DATA_LOADING_FAILURE:
            return { ...historicalData, dataError: action.payload };

        // HISTORICAL DATA SYMBOLS
        case HISTORICAL_DATA_SYMBOLS_LOADING:
            return { ...historicalData, symbolsLoading: action.payload };
        case HISTORICAL_DATA_SYMBOLS_LOADING_SUCCESS:
            return { ...historicalData, symbols: action.payload };
        case HISTORICAL_DATA_SYMBOLS_LOADING_FAILURE:
            return { ...historicalData, symbolsError: action.payload };

        // HISTORICAL DATA DATE LIMITS
        case HISTORICAL_DATA_DATE_LIMITS_LOADING:
            return { ...historicalData, dateLimitsLoading: action.payload };
        case HISTORICAL_DATA_DATE_LIMITS_LOADING_SUCCESS:
            return { ...historicalData, dateLimits: action.payload };
        case HISTORICAL_DATA_DATE_LIMITS_LOADING_FAILURE:
            return { ...historicalData, dateLimitsError: action.payload };

        default:
            return historicalData;
    }
};

export default historicalDataReducer;
