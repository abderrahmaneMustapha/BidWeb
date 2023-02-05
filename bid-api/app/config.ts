import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8080

const CORS = {
  origin: true,
  methods: ["POST", "GET", "DELETE"],
  credentials: true,
  maxAge: 3600
};

const MONGODB = {
  pass: process.env.PASS,
  host: process.env.HOST,
  db: process.env.DATABASE
} 

const CDN = {
  url: process.env.CDNURL,
  name: process.env.CDNNAME,
  apiSecretKey: process.env.CDNAPISECRET,
  apiKey: process.env.CDNAPIKEY
}


export { PORT, CORS, MONGODB, CDN }

export default Object.freeze({
  PORT,
  CORS,
  MONGODB,
  CDN
})