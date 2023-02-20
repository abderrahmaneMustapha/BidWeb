import express from "express"
import cors from "cors"
import config from "./config"
import routes from "../routes"
import "./jobs"
import "./events"

const app = express()

app.use(express.json({limit: '20mb'}))

app.options('*')
app.use('/', cors(config.CORS), routes)

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

const port = config.PORT

app.listen(port, async () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
