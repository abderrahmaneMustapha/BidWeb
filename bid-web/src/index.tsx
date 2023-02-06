import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'

import {store} from './store'

import Home from './pages/home'
import Item from './pages/item'
import Admin from './pages/admin';
import ItemEdit from './pages/admin/itemEdit';
import ItemCreate from './pages/admin/itemCreate';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/bid/:name',
    element: <Item />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/item/:name',
    element: <ItemEdit />
  },
  {
    path: '/admin/item/new',
    element: <ItemCreate />
  }
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
