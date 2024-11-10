import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/employeeRoute.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

if (!MONGOURL) {
    console.error("MONGO_URL is not defined.");
    process.exit(1);
}

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Database connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
        process.exit(1);
    });

app.use("/api/employees", route);
