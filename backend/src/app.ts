import express from 'express'; 
import cors from 'cors'
import { adminRouter } from './routes/adminRouter.js';
import cookieParser from 'cookie-parser'
import campaignRouter from './routes/campaignRouter.js';

const app = express(); 

app.use(cors({
    origin: true, 
    credentials: true 
})); 
app.use(express.json()); 
app.use(cookieParser()); 


app.use(`/api/admin`,adminRouter); 
app.use(`/api/campaign`, campaignRouter); 

export default app; 