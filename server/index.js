const express = require('express')
const morgan = require('morgan')
const AppError = require('./utils/AppError')
const globalErrorHandler = require('./controllers/error')
const app = express()

//development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

// static files
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log('hello from the middleware')
    next()
})

app.use((req, res, next) => {
    console.log('hello from the middleware')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404))
})

app.use(globalErrorHandler)

module.exports = app;