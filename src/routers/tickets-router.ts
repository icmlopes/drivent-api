import { createTicket, getAllTicketsTypes, getUserTickets } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas/tickets-schema';
import { Router } from 'express';

const ticketsRouter = Router();


ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/tickets', getUserTickets);
ticketsRouter.get('/types', getAllTicketsTypes);
ticketsRouter.post('/tickets', validateBody(createTicketSchema), createTicket)

export { ticketsRouter };

