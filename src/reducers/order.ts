import { ORDER_PLACE_ORDER_FAILURE, ORDER_PLACE_ORDER_SUCCESS } from "../constants/actionTypes";

const orderReducer = (order = {}, action: { type: string; payload: any }) => {
    switch (action.type) {
        case ORDER_PLACE_ORDER_SUCCESS:
            alert(`Order placed with Order ID: ${action.payload?.order_id}`);
            return order;

        case ORDER_PLACE_ORDER_FAILURE:
            alert("Failed to place order.");
            return order;

        default:
            return order;
    }
};

export default orderReducer;
