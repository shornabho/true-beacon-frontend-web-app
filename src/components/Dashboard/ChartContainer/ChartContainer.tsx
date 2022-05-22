import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { FormControl, InputLabel, MenuItem, Select, TextField, Grid } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import PriceChart from "./PriceChart/PriceChart";

import {
    getHistoricalDataSymbols,
    getHistoricalDataDateLimits,
    getHistoricalData,
} from "../../../actions/historicalData";

// To allow custom thunk dispatch in TypeScript
type State = { a: any };
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const ChartContainer = () => {
    const dispatch: AppDispatch = useDispatch();

    const symbols = useSelector((state: any) => state.historicalData?.symbols);
    const [chosenSymbol, setChosenSymbol] = useState<string | null>(null);

    const dateLimits = useSelector((state: any) => state.historicalData?.dateLimits);
    const [chosenStartDate, setChosenStartDate] = useState<Date | null>(null);
    const [chosenEndDate, setChosenEndDate] = useState<Date | null>(null);

    const historicalData = useSelector((state: any) => state.historicalData?.data);

    useEffect(() => {
        dispatch(getHistoricalDataSymbols());
        dispatch(getHistoricalDataDateLimits());
    }, [dispatch]);

    useEffect(() => {
        setChosenStartDate(dateLimits?.minDate);
        setChosenEndDate(dateLimits?.maxDate);
    }, [dateLimits]);

    useEffect(() => {
        setChosenSymbol(symbols && symbols[0]);
    }, [symbols]);

    useEffect(() => {
        if (chosenSymbol && chosenStartDate && chosenEndDate)
            dispatch(getHistoricalData(chosenSymbol, chosenStartDate, chosenEndDate));
    }, [dispatch, chosenSymbol, chosenStartDate, chosenEndDate]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="symbol-select-label" shrink>
                        Symbol
                    </InputLabel>
                    <Select
                        labelId="symbol-select-label"
                        id="symbol-select"
                        value={chosenSymbol}
                        label="Symbol"
                        notched
                        onChange={(e) => setChosenSymbol((e.target as HTMLInputElement).value)}
                    >
                        {symbols &&
                            symbols.map((symbol: string) => (
                                <MenuItem key={symbol} value={symbol}>
                                    {symbol}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start Date"
                        value={chosenStartDate}
                        onChange={(date: Date | null) => {
                            setChosenStartDate(date);
                        }}
                        shouldDisableDate={(date: Date) => !!(date < dateLimits?.minDate || date > dateLimits?.maxDate)}
                        disableFuture
                        renderInput={(params) => <TextField {...params} sx={{ m: 1, minWidth: 120 }} size="small" />}
                    />

                    <DatePicker
                        label="End Date"
                        value={chosenEndDate}
                        onChange={(date: Date | null) => {
                            setChosenEndDate(date);
                        }}
                        shouldDisableDate={(date: Date) => !!(date < dateLimits?.minDate || date > dateLimits?.maxDate)}
                        disableFuture
                        renderInput={(params) => <TextField {...params} sx={{ m: 1, minWidth: 120 }} size="small" />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                {historicalData && <PriceChart data={historicalData} />}
            </Grid>
        </Grid>
    );
};

export default ChartContainer;
