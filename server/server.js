import dotenv from "dotenv";
dotenv.config({ path: './.env' });
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import app from './index.js'

const DB = (process.env.MONGO_URI).replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);


cloudinary.config({
    cloud_name: `${process.env.Cloud_Name}`,
    api_key: `${process.env.Cloud_Api_Key}`,
    api_secret: `${process.env.Api_Secret}`,
})


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