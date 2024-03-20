import useLocalStorage from "./useLocalStorage"

const useTokenInHeader = () => {

    const [user] = useLocalStorage("auth");

    const getHeaderWithToken = (headers) => {

        if (user.accessToken) {
            return {
                ...headers,
                'X-Authorization': `${user.accessToken}`
            }
        }

        return headers;
    }

    return { getHeaderWithToken }
}

export default useTokenInHeader;