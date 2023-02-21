import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8000

const CORS = {
  origin: true,
  methods: ["POST", "GET", "DELETE", "PATCH"],
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

const SMTP = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
}

const JOBS = {
  bidWonInterval: process.env.BID_WON_CHECK_INTERVAL || 5,
  bidWonGoBack: process.env.BID_WON_GOING_BACK || 30,
}

export { PORT, CORS, MONGODB, CDN, JOBS, SMTP }

export default Object.freeze({
  PORT,
  CORS,
  MONGODB,
  CDN,
  JOBS,
  SMTP
})