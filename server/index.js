import express from 'express'
import AppError from './utils/AppError.js'
import globalErrorHandler from './controllers/error.js'
import cookies from 'cookie-parser'
import cors from 'cors'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import userRoute from './routes/users.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(
    cors({
        origin: "*",
    })
);

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/posts', postRoute)
app.use('/api/v1/users', userRoute)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404))
})

app.use(globalErrorHandler)

export default app