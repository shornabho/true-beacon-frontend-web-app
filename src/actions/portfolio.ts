import { Dispatch } from "redux";
import * as api from "../api/portfolio";
import {
    PORTFOLIO_HOLDINGS_LOADING,
    PORTFOLIO_HOLDINGS_LOADING_FAILURE,
    PORTFOLIO_HOLDINGS_LOADING_SUCCESS,
} from "../constants/actionTypes";

type Holding = {
    tradingsymbol: string;
    exchange: string;
    isin: string;
    quantity: number;
    authorised_date: string;
    average_price: number;
    last_price: number;
    close_price: number;
    pnl: number;
    day_change: number;
    day_change_percentage: number;
};

// Action Creators

export const getPortfolioHoldings = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: PORTFOLIO_HOLDINGS_LOADING, payload: true });

        const { data } = await api.getPortfolioHoldings();

        dispatch({ type: PORTFOLIO_HOLDINGS_LOADING, payload: false });
        dispatch({ type: PORTFOLIO_HOLDINGS_LOADING_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: PORTFOLIO_HOLDINGS_LOADING_FAILURE, payload: error });
    }
};

export const getLatestPrice = (data: Holding) => async (dispatch: Dispatch) => {
    try {
        console.log(data);
        dispatch({ type: PORTFOLIO_HOLDINGS_LOADING_SUCCESS, payload: data });
    } catch (error) {}
};
