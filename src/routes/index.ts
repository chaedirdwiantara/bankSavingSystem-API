import { Router } from 'express';
import customerRoutes from './customer.routes';
import depositoRoutes from './deposito.routes';
import accountRoutes from './account.routes';
import transactionRoutes from './transaction.routes';

const router = Router();

// API Routes
router.use('/customers', customerRoutes);
router.use('/deposito-types', depositoRoutes);
router.use('/accounts', accountRoutes);
router.use('/transactions', transactionRoutes);

// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Bank Saving System API is running',
        timestamp: new Date().toISOString(),
    });
});

export default router;
