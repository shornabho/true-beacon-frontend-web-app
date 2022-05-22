import { API } from "./index";

const urlSlug = "/order";

export const placeOrder = (order: { symbol: string; price: number; quantity: number }) =>
    API.post(`${urlSlug}/place-order`, order);
