const express = require('express');
const cookieParser = require('cookie-parser')
const authRoute = require("../src/routes/auth.routes")
const musicRoute=require("../src/routes/music.routes")


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth/", authRoute)

app.use("/api/music/",musicRoute)


module.exports= app