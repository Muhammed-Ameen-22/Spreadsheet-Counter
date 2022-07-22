import express from 'express';
import dotenv from "dotenv";
import db from './config/db.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/Dashboard.js'
import subscriptionRoutes from './routes/Subscriptons.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";


dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 8089;
// console.log('PORT',port)

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);


app.use('/api',authRoutes);
app.use('/api',dashboardRoutes);
app.use('/api',subscriptionRoutes);


app.listen(port,()=>{
    console.log('server started @',port);
})
