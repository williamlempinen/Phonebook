const config = require("./utils/config")
const logger = require("./utils/logger")
const express = require("express")
const app = express()
const cors = require("cors")
const peopleRouter = require("./controllers/people")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch(error => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())

app.use("/api/persons", peopleRouter)

module.exports = app

