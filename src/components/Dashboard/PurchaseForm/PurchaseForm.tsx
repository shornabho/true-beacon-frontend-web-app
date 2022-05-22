import { Paper, TextField, Grid, Button } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";

import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { placeOrder } from "../../../actions/order";

// To allow custom thunk dispatch in TypeScript
type State = { a: any };
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const PurchaseCard = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    padding: "2rem 1.5rem 2.5rem",
}));
const lightTheme = createTheme({ palette: { mode: "light" } });

// Initial Data
const initialData = { symbol: "", quantity: "", price: "" };

const PurchaseForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const [form, setForm] = useState(initialData);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        // Place Order
        dispatch(
            placeOrder({ symbol: form.symbol, quantity: parseFloat(form.quantity), price: parseFloat(form.price) })
        );

        // Clear Form
        setForm(initialData);
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <PurchaseCard elevation={8}>
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <TextField
                        name="symbol"
                        variant="outlined"
                        label="Symbol"
                        fullWidth
                        margin="dense"
                        value={form.symbol}
                        onChange={handleChange}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                name="quantity"
                                variant="outlined"
                                label="Quantity"
                                fullWidth
                                type={"number"}
                                inputProps={{
                                    min: 0,
                                }}
                                margin="dense"
                                value={form.quantity}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="price"
                                variant="outlined"
                                label="Price"
                                fullWidth
                                type={"number"}
                                inputProps={{
                                    min: 0,
                                }}
                                margin="dense"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        sx={{
                            marginTop: "1rem",
                            backgroundColor: "#ffa500",
                            ":hover": { backgroundColor: "#fea500" },
                        }}
                        variant="contained"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Purchase
                    </Button>
                </form>
            </PurchaseCard>
        </ThemeProvider>
    );
};
export default PurchaseForm;
