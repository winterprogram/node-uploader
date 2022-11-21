import { Router } from 'express';
import { initiliazeServer } from './controller/main.controller';


export const router: Router = Router();



//Health Check
router.get('/start', initiliazeServer);







