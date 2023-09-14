const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { errorHandler, userExtractor } = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('client/build'))
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
// check for successful deployment in the pipeline
app.get("/version", (req, res) => {
  res.send("1.0.0");  // change this string to ensure a new version deployed
});
// Simple health check
app.get("/health", (req, res) => {
  res.send("<h1>Ok</h1>");
});
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}


app.use(errorHandler)

module.exports = app
