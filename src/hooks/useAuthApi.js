import useTokenInHeader from "./useTokenInHeader";

const useAuthApi = () => {

    const { getHeaderWithToken } = useTokenInHeader();
    const baseUrl = 'http://localhost:3030/users';

    const login = (username, password) => {
        return fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
    }

    const register = (username, password, firstName, lastName, email) => {
        return fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, firstName, lastName, email }),
        })
            .then((response) => response.json())
    }

    const logout = (token) => {
        return fetch(`${baseUrl}/logout`, {
            method: 'GET',
            headers: {
                'X-Authorization': `${token}`
            }
        })
    }

    const getUser = () => {
        return fetch(`${baseUrl}/me`, {
            method: 'GET',
            headers: getHeaderWithToken(
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            )
        })
            .then(response => response.json())
    }

    return { login, register, logout, getUser };
}

export default useAuthApi;