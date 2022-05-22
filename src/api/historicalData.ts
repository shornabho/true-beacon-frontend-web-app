import { API } from "./index";

const urlSlug = "/historical-data";

// Get Historical Data
export const getHistoricalData = (symbol: string, from_date: Date, to_date: Date) =>
    API.get(`${urlSlug}`, {
        params: {
            symbol,
            from_date: from_date.toISOString(),
            to_date: to_date.toISOString(),
        },
    });

// Get All Symbols for Historical Data
export const getHistoricalDataSymbols = () => API.get(`${urlSlug}/symbols`);

// Get Date Limits for Historical Data
export const getHistoricalDataDateLimits = () => API.get(`${urlSlug}/date-limits`);
