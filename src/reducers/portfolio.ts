import {
    PORTFOLIO_HOLDINGS_LOADING,
    PORTFOLIO_HOLDINGS_LOADING_FAILURE,
    PORTFOLIO_HOLDINGS_LOADING_SUCCESS,
} from "../constants/actionTypes";

const portfolioReducer = (portfolio = {}, action: { type: string; payload: any }) => {
    switch (action.type) {
        // PORTFOLIO HOLDINGS
        case PORTFOLIO_HOLDINGS_LOADING:
            return { ...portfolio, holdingsLoading: action.payload };
        case PORTFOLIO_HOLDINGS_LOADING_SUCCESS:
            return { ...portfolio, holdings: action.payload };
        case PORTFOLIO_HOLDINGS_LOADING_FAILURE:
            return { ...portfolio, holdingsError: action.payload };

        default:
            return portfolio;
    }
};

export default portfolioReducer;
