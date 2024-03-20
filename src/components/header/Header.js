import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../contexts/AuthContext";
import ShoppingCartContext from "../../contexts/ShoppingCartContext";
import styles from './Header.module.css';
import ShoppingCart from "../shoppingCart/ShoppingCart";



const Header = () => {

    const { auth, userLogout } = useContext(AuthContext);
    const { cartItems } = useContext(ShoppingCartContext);

    const logoutHandler = () => {
        userLogout();
    }

    const [showShoppingCart, setShowShoppingCart] = useState(false);

    const handleClose = () => setShowShoppingCart(false);
    const handleShow = () => setShowShoppingCart(true);

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
                <div className="container">
                    <Link to='/' className="navbar-brand">
                        MTB-Shop
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-center"
                        id="navbarsExampleDefault"
                    >
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <Link to='/' className="nav-link">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/catalog' className="nav-link">
                                    Catalog
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/about' className="nav-link">
                                    About
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/contact-us' className="nav-link" >
                                    Contact
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav ">
                        {console.log(auth)}
                        {!auth.accessToken
                            ? <Link to='/login' className="nav-link">
                                Login
                                <FontAwesomeIcon className={styles.userMenuIcon} icon={faUser} />
                            </Link>
                            : <>
                                <li className={styles.shoppingCardIcon}>
                                    <FontAwesomeIcon
                                        onClick={() => handleShow()} icon={faShoppingCart}
                                        className={`${cartItems.length ? styles.shoppingCart : styles.shoppingCartEmpty}`}
                                    />
                                    <span
                                        className={`${cartItems.length ? styles.numberNotifRedCart : styles.numberNotifCart}`}>
                                        {cartItems.length === 0 ? '' : cartItems.length}
                                    </span>
                                </li>
                                <ShoppingCart show={showShoppingCart} handleClose={handleClose} />
                                <li className="nav-item">
                                    <Link to='/profile' className="nav-link">
                                        My profile
                                        <FontAwesomeIcon className={styles.userMenuIcon} icon={faUser} />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/' className="nav-link" onClick={logoutHandler}>
                                        Logout
                                        <FontAwesomeIcon className={styles.userMenuIcon} icon={faArrowRightFromBracket} />
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </header >
    );
}

export default Header;