import express from 'express'; 
import cors from 'cors'
import { adminRouter } from './routes/adminRouter.js';
import cookieParser from 'cookie-parser'
import campaignRouter from './routes/campaignRouter.js';
import { blogRouter } from './routes/blogRouter.js';
import { galleryRouter } from './routes/galleryRouter.js';
import formRouter from "./routes/formRouter.js";

const app = express(); 

app.use(cors({
    origin: true, 
    credentials: true 
})); 
app.use(express.json()); 
app.use(cookieParser()); 
app.use(express.urlencoded({extended: true}))


app.use(`/api/admin`,adminRouter); 
app.use(`/api/campaign`, campaignRouter); 
app.use(`/api/blogs`, blogRouter);  
app.use(`/api/gallery`, galleryRouter);
app.use(`/api/form`, formRouter);

export default app; 