import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import db from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 8089;
// console.log('PORT',port)

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use('/api',authRoutes);


app.listen(port,()=>{
    console.log('server started @',port);
})
