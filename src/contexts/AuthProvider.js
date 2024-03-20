import AuthContext from './AuthContext'
import useLocalStorage from '../hooks/useLocalStorage';
import useAuthApi from '../hooks/useAuthApi';

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useLocalStorage("auth", {
        id: '',
        username: '',
        accessToken: '',
    });

    const { login, logout, register } = useAuthApi();

    const userLogin = (username, password) => login(username, password)
        .then((response) => {
            if (response.code === 403) {
                return {
                    errorCode: 403,
                    errorMessage: response.message,
                    isError: true
                };
            } else {
                setAuth({
                    id: response._id,
                    username: response.username,
                    accessToken: response.accessToken
                });
            }
        }).catch((error) => {
            return {
                isError: true
            }
        });

    const userLogout = () => logout(auth.accessToken)
        .then((response) => {
            setAuth({
                id: '',
                username: '',
                accessToken: '',
            });
        })
        .catch((error) => {
            return {
                isError: true
            }
        });

    const userRegister = (username, password, firstName, lastName, email) =>
        register(username, password, firstName, lastName, email)
            .then((data) => {
                if (data.code === 409) {
                    return {
                        errorCode: 409,
                        errorMessage: data.message,
                        isError: true
                    };
                } else {
                    setAuth({
                        id: data._id,
                        username: data.username,
                        accessToken: data.accessToken
                    });
                }
            })
            .catch((error) => {
                return {
                    isError: true
                }
            });

    return (
        <AuthContext.Provider value={{ auth, userLogin, userLogout, userRegister }}>
            {children}
        </AuthContext.Provider>
    );
};