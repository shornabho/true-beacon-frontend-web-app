import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { Typography, Box, Paper, Table, TableRow, TableCell } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { getUserProfile } from "../../../actions/user";

const ProfileCard = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    padding: "2rem 1.5rem 2.5rem",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

// To allow custom thunk dispatch in TypeScript
type State = { a: any };
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const ProfileInfoCard = () => {
    const user = useSelector((state: any) => state.user.userProfile);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    return (
        <ThemeProvider theme={lightTheme}>
            <Box>
                <ProfileCard elevation={8}>
                    <Typography variant="h5" fontWeight={400} textAlign={"center"}>
                        {user?.user_name}
                    </Typography>
                    <Typography
                        variant="caption"
                        fontWeight={400}
                        textAlign={"center"}
                        display="block"
                        gutterBottom
                        marginBottom={2}
                    >
                        {user?.email}
                    </Typography>

                    <Table size="small">
                        <TableRow>
                            <TableCell padding="none">ID</TableCell>
                            <TableCell align="right">{user?.user_id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="none">Broker</TableCell>
                            <TableCell align="right">{user?.broker.toUpperCase()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="none">Type</TableCell>
                            <TableCell align="right">{user?.user_type.toUpperCase()}</TableCell>
                        </TableRow>
                    </Table>
                </ProfileCard>
            </Box>
        </ThemeProvider>
    );
};
export default ProfileInfoCard;
