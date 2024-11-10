import express from 'express'; 
import cors from 'cors'
import { adminRouter } from './routes/adminRouter.js';

const app = express(); 

app.use(cors()); 
app.use(express.json()); 

app.use(`/api/admin`,adminRouter); 

export default app; 