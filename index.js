const express = require('express')
const cloudinary = require('cloudinary').v2;

const cors = require('cors')
const {connect_db} = require('./config/db')
const color = require("colors")
const authRoute = require('./routes/authRoute')
const studRoute = require("./routes/studRoute")
require('dotenv').config()


const app = express()

// cloudinary config

cloudinary.config({
    cloud_name: "djfvqd23n",
    api_key: "333756586916113",
    api_secret: "I5ViJBkeTLh_DGCUyFTDeMBiD-Q"
  });
  


// middlewares
app.use(express.json())
app.use(cors({origin: true, credentials: true}));

// routes

app.use('/auth', authRoute)
app.use('/student', studRoute)
app.use("/company", require("./routes/compRoute"))

app.get('*', (req, res)=>res.send("not found"))
app.post('*', (req, res)=>res.send("not found"))

app.listen(process.env.PORT, ()=>{
    connect_db()
    console.log("server is runing " + process.env.PORT)
})