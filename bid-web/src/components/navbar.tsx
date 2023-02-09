import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromStorage, removeUserFromStorage } from "../common/auth";
import { useNotifyUserMutation } from "../redux/queries";
import AutoBidModal from "./autoBidModal";
import Modal from "./modal";

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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-gear-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                </button>
                                {getUserFromStorage()?.is_admin && (
                                    <button
                                        title="Admin dashboard"
                                        className="btn btn-light"
                                        onClick={() => {
                                            navigate("/admin");
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-person-circle"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                            />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    className="btn btn-light"
                                    onClick={() => {
                                        navigate("/notifications");
                                    }}
                                >
                                    Notifications
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
