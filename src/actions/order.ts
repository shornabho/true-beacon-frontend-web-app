import { Dispatch } from "redux";
import * as api from "../api/order";
import { ORDER_PLACE_ORDER_SUCCESS, ORDER_PLACE_ORDER_FAILURE } from "../constants/actionTypes";

// Action Creators

export const placeOrder =
    (order: { symbol: string; price: number; quantity: number }) => async (dispatch: Dispatch) => {
        try {
            const { data } = await api.placeOrder(order);

            dispatch({ type: ORDER_PLACE_ORDER_SUCCESS, payload: data.data });
        } catch (error) {
            dispatch({ type: ORDER_PLACE_ORDER_FAILURE, payload: error });
        }
    };
