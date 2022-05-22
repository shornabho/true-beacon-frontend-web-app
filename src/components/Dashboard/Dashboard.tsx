import { Grid, Grow, Container } from "@mui/material";
import { useSelector } from "react-redux";

import ChartContainer from "./ChartContainer/ChartContainer";
import HoldingsContainer from "./HoldingsContainer/HoldingsContainer";
import ProfileInfoCard from "./ProfileInfoCard/ProfileInfoCard";
import PurchaseForm from "./PurchaseForm/PurchaseForm";

const Dashboard = () => {
    const isLoggedIn = useSelector((state: any) => state.user?.user?.token?.access_token);

    return (
        <div className="container">
            <Grid container justifyContent={"space-evenly"} alignItems="start" spacing={3} marginTop={1}>
                <Grid item xs={12} md={9}>
                    <h1>Historical Data</h1>
                    <ChartContainer></ChartContainer>
                </Grid>
                <Grid item xs={12} md={3}>
                    {isLoggedIn && (
                        <Grow in>
                            <Container>
                                <h1>Profile</h1>
                                <ProfileInfoCard />
                            </Container>
                        </Grow>
                    )}
                </Grid>
                <Grid item xs={12} md={9}>
                    {isLoggedIn && (
                        <Grow in>
                            <div>
                                <h1>Holdings</h1>
                                <HoldingsContainer />
                            </div>
                        </Grow>
                    )}
                </Grid>
                <Grid item xs={12} md={3}>
                    {isLoggedIn && (
                        <Grow in>
                            <Container>
                                <h1>Make a Purchase!</h1>
                                <PurchaseForm />
                            </Container>
                        </Grow>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
