import { useNavigate } from "react-router-dom";
import { removeUserFromStorage } from "../common/auth";

const SideBar = () => {
    const navigate = useNavigate();
    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/admin">
                    Admin Dashboard
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="offcanvas offcanvas-end"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5
                            className="offcanvas-title"
                            id="offcanvasNavbarLabel"
                        >
                            Admin Navbar
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    aria-current="page"
                                    href="/"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link active" href="/admin">
                                    Items
                                </a>
                            </li>

                            <li className="nav-item ">
                                <span
                                    className="nav-link active"
                                    onClick={() => {
                                        removeUserFromStorage();
                                        navigate("/login");
                                    }}
                                >
                                    Logout
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SideBar;
