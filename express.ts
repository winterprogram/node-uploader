import express, { RequestHandler } from 'express';
import { json } from 'body-parser';
import { router } from './routes';
import  dotenv from 'dotenv' 
import cors from 'cors';
export const app = express();
dotenv.config();
app.use(json() as RequestHandler);
app.use(express.static('files'));
app.use(cors());
app.use('/api', router);
