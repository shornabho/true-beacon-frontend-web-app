import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import {
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { getLatestPrice, getPortfolioHoldings } from "../../../actions/portfolio";

// To allow custom thunk dispatch in TypeScript
type State = { a: any };
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

// Extends Paper material UI component
const InfoCard = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    padding: "2rem 1rem 1.5rem",
}));

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

const HoldingsContainer = () => {
    const dispatch: AppDispatch = useDispatch();
    const holdings: Holding[] = useSelector((state: any) => state.portfolio.holdings);

    const [daysPnL, setDaysPnL] = useState<number | null>(null);
    const [totalPnL, setTotalPnL] = useState<number | null>(null);

    useEffect(() => {
        // Load portfolio holdings on component load
        dispatch(getPortfolioHoldings());

        // Get latest stock prices
        let socket = new WebSocket(
            `${process.env.REACT_APP_WEB_SOCKET_BASE_URL}/ws?token=${
                JSON.parse(localStorage.getItem("user") || "")?.token?.access_token
            }`
        );
        socket.onmessage = (event) => dispatch(getLatestPrice(JSON.parse(event.data)));
    }, [dispatch]);

    // Update PnL cards after holdings data is loaded from API
    useEffect(() => {
        setDaysPnL(
            holdings
                ?.map((row: Holding) => row.day_change)
                .reduce((previous: number, current: number) => previous + current, 0)
        );
        setTotalPnL(
            holdings
                ?.map((row: Holding) => row.pnl)
                .reduce((previous: number, current: number) => previous + current, 0)
        );
    }, [holdings]);

    return (
        <Grid container>
            <Grid item xs={11}>
                <TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Instrument</TableCell>
                                <TableCell align="right">Qty.</TableCell>
                                <TableCell align="right">Avg. Cost</TableCell>
                                <TableCell align="right">LTP</TableCell>
                                <TableCell align="right">Cur. Value</TableCell>
                                <TableCell align="right">P&L</TableCell>
                                <TableCell align="right">Day chg.</TableCell>
                                <TableCell align="right">Day chg. %</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {holdings &&
                                holdings.map((row) => (
                                    <TableRow
                                        key={row.isin}
                                        sx={{
                                            "&:last-child td, &:last-child th": {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography>{row.tradingsymbol}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography>{row.quantity}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography>{row.average_price.toFixed(2)}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography>{row.last_price.toFixed(2)}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography>{(row.last_price * row.quantity).toFixed(2)}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography color={row.pnl > 0 ? "green" : row.pnl < 0 ? "red" : "inherit"}>
                                                {row.pnl > 0 ? "+" : ""}
                                                {row.pnl.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                color={
                                                    row.day_change > 0
                                                        ? "green"
                                                        : row.day_change < 0
                                                        ? "red"
                                                        : "inherit"
                                                }
                                            >
                                                {row.day_change > 0 ? "+" : ""}
                                                {row.day_change.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                color={
                                                    row.day_change_percentage > 0
                                                        ? "green"
                                                        : row.day_change_percentage < 0
                                                        ? "red"
                                                        : "inherit"
                                                }
                                            >
                                                {row.day_change_percentage > 0 ? "+" : ""}
                                                {row.day_change_percentage.toFixed(2)}%
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={11}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <InfoCard>
                            <Typography variant="caption" textAlign="center" display="block">
                                Total Investment
                            </Typography>
                            <Typography variant="h5" textAlign="center" display="block" fontWeight={700}>
                                {holdings
                                    ?.map((row) => row.average_price * row.quantity)
                                    .reduce((previous, current) => previous + current, 0)
                                    .toFixed(2)}
                            </Typography>
                        </InfoCard>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <InfoCard>
                            <Typography variant="caption" textAlign="center" display="block">
                                Current Value
                            </Typography>
                            <Typography variant="h5" textAlign="center" display="block" fontWeight={700}>
                                {holdings
                                    ?.map((row) => row.last_price * row.quantity)
                                    .reduce((previous, current) => previous + current, 0)
                                    .toFixed(2)}
                            </Typography>
                        </InfoCard>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <InfoCard>
                            <Typography variant="caption" textAlign="center" display="block">
                                Day's P&L
                            </Typography>
                            {daysPnL && (
                                <Typography
                                    variant="h5"
                                    textAlign="center"
                                    display="block"
                                    fontWeight={700}
                                    color={daysPnL && daysPnL > 0 ? "green" : daysPnL < 0 ? "red" : ""}
                                >
                                    {daysPnL && daysPnL > 0 ? "+" : ""}
                                    {daysPnL && daysPnL.toFixed(2)}
                                </Typography>
                            )}
                        </InfoCard>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <InfoCard>
                            <Typography variant="caption" textAlign="center" display="block">
                                Total P&L
                            </Typography>
                            {totalPnL && (
                                <Typography
                                    variant="h5"
                                    textAlign="center"
                                    display="block"
                                    fontWeight={700}
                                    color={totalPnL > 0 ? "green" : totalPnL < 0 ? "red" : ""}
                                >
                                    {totalPnL > 0 ? "+" : ""}
                                    {totalPnL.toFixed(2)}
                                </Typography>
                            )}
                        </InfoCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default HoldingsContainer;
