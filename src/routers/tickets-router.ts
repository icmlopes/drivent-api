import { getAllTicketsTypes } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter
.all('/*', authenticateToken)
.get("/tickets",)
.get('/types', getAllTicketsTypes);

export { ticketsRouter };
