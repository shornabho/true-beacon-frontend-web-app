import { combineReducers } from "redux";

import historicalData from "./historicalData";
import portfolio from "./portfolio";
import user from "./user";
import order from "./order";

export default combineReducers({ historicalData, portfolio, user, order });
