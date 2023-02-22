import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { store } from "./store";

import Home from "./pages/home";
import Item from "./pages/item";
import Admin from "./pages/admin";
import ItemEdit from "./pages/admin/itemEdit";
import ItemCreate from "./pages/admin/itemCreate";
import BidHistory from "./pages/admin/bidHistory";
import Login from "./pages/auth/login";
import ProtectedRoute from "./components/protectedRoute";
import AdminRoute from "./components/adminRoute";
import Notifications from "./pages/notifications";
import Profile from "./pages/profile";
import Register from "./pages/auth/register";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/bid/:name",
        element: (
            <ProtectedRoute>
                <Item />
            </ProtectedRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        )
    },
    {
        path: "/notifications",
        element: (
            <ProtectedRoute>
                <Notifications />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin",
        element: (
            <AdminRoute>
                <Admin />
            </AdminRoute>
        ),
    },
    {
        path: "/admin/item/:name",
        element: (
            <AdminRoute>
                <ItemEdit />
            </AdminRoute>
        ),
    },
    {
        path: "/admin/item/new",
        element: (
            <AdminRoute>
                <ItemCreate />
            </AdminRoute>
        ),
    },
    {
        path: "/admin/item/:name/history",
        element: (
            <AdminRoute>
                <BidHistory />
            </AdminRoute>
        ),
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
