import express from "express"
import http from "http"
import cors from "cors"
import config from "./config"
import routes from "../routes"
import socket from 'socket.io'
import "./jobs"
import "./events"

const app = express()
const server =  http.createServer(app)
const io = new socket.Server(server, {cors:{...config.CORS}});

io.on('connection', function(socket){
  console.log('Socket is connected')
});

app.use(express.json({limit: '20mb'}))

app.options('*')
app.use('/', cors(config.CORS), routes)
app.set('socket', io)
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

const port = config.PORT

server.listen(port, async () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
