import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { minLength, isEmail } from "../../../utils/validationUtils";

import styles from './RegisterForm.module.css';
import AuthContext from "../../../contexts/AuthContext";

const RegisterForm = () => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: "",
        password: "",
        email: ""
    });

    const { userRegister } = useContext(AuthContext);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const validateLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: minLength(e.target.value, bound),
        }));
    }

    const validateEmail = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: isEmail(e.target.value),
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        registerHandler();
    }

    const registerHandler = () => {

        userRegister(values.username, values.password, values.firstName, values.lastName, values.email)
            .then((res) => {
                if (res && res.isError) {
                    setErrors(res);
                }
                else {
                    navigate("/", { replace: true })
                }
            })
    }

    let isDisabledLogin = true;
    const { firstName, lastName, username, password } = errors;
    if (!firstName && !lastName && !username && !password) {
        isDisabledLogin = false;
    }

    return (
        <>
            <div className='main-wrapper'>
                <form onSubmit={submitHandler} className={styles.formRegister}>
                    <h3 className={styles.formHeading}>Register</h3>

                    <label className={styles.labelLogin} htmlFor="email">Email</label>
                    <input
                        className={styles.inputLogin}
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={changeHandler}
                        onBlur={(e) => validateEmail(e)}
                        required={true}
                    />
                    {errors.email &&
                        <p className={styles.validationError}>
                            Email is not valid format!
                        </p>
                    }

                    <label className={styles.labelLogin} htmlFor="username">Username</label>
                    <input
                        className={styles.inputLogin}
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={values.username}
                        onChange={changeHandler}
                        onBlur={(e) => validateLength(e, 3)}
                        required={true}
                    />
                    {errors.username &&
                        <p className={styles.validationError}>
                            Username should be at least 3 characters long!
                        </p>
                    }
                    <label className={styles.labelLogin} htmlFor="password">Password</label>
                    <input
                        className={styles.inputLogin}
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={changeHandler}
                        onBlur={(e) => validateLength(e, 6)}
                        required={true}
                    />
                    {errors.password &&
                        <p className={styles.validationError}>
                            Password should be at least 6 characters long!
                        </p>
                    }

                    {errors.isError && errors.errorCode == '' && <div className={styles.validationError}>An error has occured. Please try again later.</div>}
                    {errors.isError && errors.errorMessage != '' && <div className={styles.validationError}>{errors.errorMessage}</div>}

                    <button disabled={isDisabledLogin} className={isDisabledLogin ? styles.buttonLoginOff : styles.buttonLoginOn}>Log In</button>
                    <div className={styles.containerFormBtn}>
                        <span className={styles.registerText}>Have an existing account?</span>
                        <Link className={styles.registerLink} to="/login">Log In</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterForm;