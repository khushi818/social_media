import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import app from './index.js'

const DB = (process.env.MONGO_URI).replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
    console.log("DB successful");
});

const port = process.env.PORT || 8000;

app
    .listen(port, () => {
        console.log(`server is running ${port}`);
    })
    .on("error", (err) => {
        console.log(err);
    });