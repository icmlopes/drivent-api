import { getPayment } from '@/controllers/payment-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', getPayment)
paymentsRouter.post('/process')

export {paymentsRouter}