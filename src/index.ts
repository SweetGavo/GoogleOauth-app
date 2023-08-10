import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"
import router from "./router"
import dotenv from "dotenv"
import passport from "passport"
import { passportConfig } from "config/passportConfig"
import jwt from 'jsonwebtoken';

passportConfig(passport)


dotenv.config();

const app = express();

app.use(cors({
    credentials : true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.get("/",(req:express.Request,res:express.Response)=>{
res.send("API...");
})


server.listen(8080,()=>{
    console.log("App server listening on http://localhost:8080/");
    
});

const MONGODB_URL = 'mongodb+srv://gavin:allieantisnode@cluster1.pxqwsfi.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL);

mongoose.connection.on("error",(error:Error) => console.log(error))

app.use('/',router());