const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connect = require("./database/db")

const app = express()

app.use(express.json())


const PORT = process.env.PORT || 5000


const TodoRoute = require("./routes/todoRoutes")
const UserRoute = require("./routes/userRoutes")
connect()

app.use("/", TodoRoute)
app.use("/", UserRoute)


app.listen(PORT, () => console.log("Servidor Conectado"))
