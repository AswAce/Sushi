import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

// Protected component: use to wrap the component that needs to be protected(hidden)

const ProtectedRoute = ({ children }) => {

    const { auth } = useContext(AuthContext);

    if (!auth.accessToken) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;