import { io } from 'socket.io-client';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000"
const PAGINATION_ITEMS = process.env.REACT_APP_PAGINATION_ITEMS
const CREDENTIALS_STORE_KEY  = process.env.REACT_APP_CREDENTIALS_STORE_KEY

const socket = io(BACKEND_URL);

export { BACKEND_URL, PAGINATION_ITEMS, CREDENTIALS_STORE_KEY, socket }