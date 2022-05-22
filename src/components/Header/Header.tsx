import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Header.module.css";
import logo from "../../logo.svg";

const Header = () => {
    const isLoggedIn = useSelector((state: any) => state.user?.user?.token?.access_token);

    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <Link to="/" className={styles.brand}>
                        <img src={logo} className={styles.brandLogo} alt="True Beacon Logo" />
                    </Link>

                    <div className={styles.navLinks}>
                        {isLoggedIn && (
                            <Link to="/logout" className={styles.navLink}>
                                Logout
                            </Link>
                        )}

                        {!isLoggedIn && (
                            <>
                                <Link to="/login" className={styles.navLink}>
                                    Login
                                </Link>
                                <Link to="/register" className={styles.navLink}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
