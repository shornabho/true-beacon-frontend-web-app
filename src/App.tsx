import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthBox from "./components/AuthBox/AuthBox";

function App() {
    return (
        <div>
            <Router>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<AuthBox />} />
                    <Route path="/register" element={<AuthBox />} />
                    <Route path="/logout" element={<AuthBox />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
