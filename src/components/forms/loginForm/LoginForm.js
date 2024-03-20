import styles from './LoginForm.module.css'
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import { useState, useContext } from 'react';
import { minLength } from "../../../utils/validationUtils";

const LoginForm = () => {
    const { auth, userLogin } = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

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

    const submitHandler = (e) => {
        e.preventDefault();
        loginHandler();
    }

    const loginHandler = () => {
        userLogin(values.username, values.password)
            .then((result) => {
                console.log(result);
                if (result && result.isError) {
                    setErrors(result);
                }
            });
    }

    if (auth.accessToken) {
        return <Navigate to="/" />;
    }


    let isDisabledLogin = true;
    const { username, password } = errors;
    if (!username && !password) {
        isDisabledLogin = false;
    }

    return (
        <>
            <div className='main-wrapper'>
                <form className={styles.formLogin} onSubmit={submitHandler}>
                    <h3>Login</h3>

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
                        <span className={styles.registerText}>Still don't have an account?</span>
                        <Link className={styles.registerLink} to="/register">Register now</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginForm;