import { getAllTicketsTypes, getUserTickets } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter
.all('/*', authenticateToken)
.get('/tickets', getUserTickets)
.get('/types', getAllTicketsTypes);

export { ticketsRouter };
