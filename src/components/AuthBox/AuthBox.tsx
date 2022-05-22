import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { loginUser, logoutUser, registerUser } from "../../actions/user";

// To allow custom thunk dispatch in TypeScript
type State = { a: any };
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const initialState = { name: "", username: "", password: "" };

const AuthBox = () => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const isLogout = location.pathname === "/logout";
    if (isLogout) {
        dispatch(logoutUser(navigate));
        navigate("/login");
    }

    const isRegister = location.pathname === "/register";

    const [form, setForm] = useState(initialState);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (isRegister) {
            dispatch(registerUser(form.username, form.name, form.password, navigate));
        } else {
            dispatch(loginUser(form.username, form.password, navigate));
        }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="container">
            <Container>
                <Paper elevation={16} sx={{ margin: "3rem auto", width: "50%", padding: "7% 7% 8%" }}>
                    <Container>
                        <Typography variant="h3" component="h1" gutterBottom>
                            {isRegister ? <>Register</> : <>Login</>}
                        </Typography>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <Typography variant="caption" color={"red"}></Typography>
                            <TextField
                                name="username"
                                variant="outlined"
                                label="Username"
                                required
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />

                            {isRegister && (
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    label="Name"
                                    required
                                    fullWidth
                                    margin="normal"
                                    onChange={handleChange}
                                />
                            )}
                            <TextField
                                name="password"
                                variant="outlined"
                                label="Password"
                                required
                                fullWidth
                                margin="normal"
                                type={"password"}
                                onChange={handleChange}
                            />

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
                                {isRegister ? <>Register</> : <>Login</>}
                            </Button>
                        </form>
                    </Container>
                </Paper>
            </Container>
        </div>
    );
};

export default AuthBox;
