import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../common/auth";
import { User } from "../common/types";

const ProtectedRoute = ({
    redirectPath = "/login",
    children,
}: {
    children: JSX.Element | JSX.Element[];
    redirectPath?: string;
}) => {
    const user: User | undefined = getUserFromStorage();
    if (!user?.username) {
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
