import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'

import Home from './pages/home'
import Item from './pages/item'
import Admin from './pages/admin';
import ItemEdit from './pages/admin/itemEdit';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/bid/:id/:name',
    element: <Item />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/:id',
    element: <ItemEdit />
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
