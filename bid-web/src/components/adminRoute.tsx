import { Navigate, useLocation } from "react-router-dom";
import { getUserFromStorage } from "../common/auth";
import { User } from "../common/types";

const AdminRoute = ({
    redirectPath = "/",
    children,
}: {
    children: JSX.Element | JSX.Element[];
    redirectPath?: string;
}) => {
    const user: User | undefined = getUserFromStorage();
    let location = useLocation();
    if (!user?.is_admin && location.pathname.includes("admin")) {
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
};

export default AdminRoute;
