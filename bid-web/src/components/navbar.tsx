import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage, removeUserFromStorage } from "../common/auth";
import ConfigIcon from "../icons/config";
import DashboardIcon from "../icons/dashboard";
import NotificationsIcon from "../icons/notifications";
import AutoBidModal from "./autoBidModal";

const NavBar = () => {
    const [hideModal, setHideModal] = useState(true);
    const [isLogin] = useState(() => {
        return !!getUserFromStorage()?.username;
    });

    const navigate = useNavigate();
    const showModal = () => {
        setHideModal(false);
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Bid Web
                    </a>
                    <div className="d-flex flex-row">
                        {isLogin && (
                            <>
                                <button
                                    title="Configure auto bid"
                                    className="btn btn-light"
                                    onClick={showModal}
                                >
                                    <ConfigIcon />
                                </button>
                                {getUserFromStorage()?.is_admin && (
                                    <button
                                        title="Admin dashboard"
                                        className="btn btn-light"
                                        onClick={() => {
                                            navigate("/admin");
                                        }}
                                    >
                                        <DashboardIcon />
                                    </button>
                                )}
                                <button
                                    title="Notifications"
                                    className="btn btn-light"
                                    onClick={() => {
                                        navigate("/notifications");
                                    }}
                                >
                                    <NotificationsIcon />
                                </button>
                                <button
                                    className="btn btn-light"
                                    onClick={() => {
                                        removeUserFromStorage();
                                        navigate("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <AutoBidModal
                hide={hideModal}
                onClose={() => setHideModal(true)}
            ></AutoBidModal>
        </>
    );
};

export default NavBar;
