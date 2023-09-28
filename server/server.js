const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const app = require('./index')

process.on('uncaughtException', err => {
    console.log(err.name, err.message)
    process.exit(1)
})

// database credential
const DB = process.env.MONGO_URI.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
)

mongoose.connect(DB).then(con => console.log('DB connection successful'))

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`App running on port ${port}....`)
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    server.close(() => {
        console.log('shutting down....')
        process.exit(1)
    })
})

