import { API } from "./index";

const urlSlug = "/portfolio";

export const getPortfolioHoldings = () => API.get(`${urlSlug}/holdings`);
