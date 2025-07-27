import dotenv from 'dotenv'
dotenv.config();


import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { ServerConnection } from '../miscellanous/mongodb.js';
import soundRoutes  from "../routes/sounds.js";


// Configuration 
export const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Allow frontend origin (Vite default is localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));
app.use('/api/uploads', express.static('uploads'));

app.use('/api/sounds', soundRoutes);


app.use ('/', (req, res) => {
    res.send('Hello from server')
    res.status(200);
    res.headers('Content-Type', 'text/plain'); 
})

ServerConnection();




