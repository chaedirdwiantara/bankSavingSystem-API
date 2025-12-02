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
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running and healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Bank Saving System API is running
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Bank Saving System API is running',
        timestamp: new Date().toISOString(),
    });
});

export default router;
