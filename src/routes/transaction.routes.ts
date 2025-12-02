import { Router } from 'express';
import { body } from 'express-validator';
import { TransactionController } from '../controllers/transaction.controller';
import { validateRequest } from '../middleware/validator';

const router = Router();
const controller = new TransactionController();

// Validation rules
const depositValidation = [
    body('account_id')
        .isUUID()
        .withMessage('Valid account ID is required'),
    body('amount')
        .isFloat({ min: 0.01 })
        .withMessage('Amount must be greater than 0'),
    body('transaction_date')
        .isISO8601()
        .withMessage('Valid transaction date is required'),
    validateRequest,
];

const withdrawalValidation = [
    body('account_id')
        .isUUID()
        .withMessage('Valid account ID is required'),
    body('amount')
        .isFloat({ min: 0.01 })
        .withMessage('Amount must be greater than 0'),
    body('transaction_date')
        .isISO8601()
        .withMessage('Valid transaction date is required'),
    validateRequest,
];

// Routes

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: account_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by account ID
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 */
router.get('/', controller.getAllTransactions.bind(controller));

/**
 * @swagger
 * /api/transactions/deposit:
 *   post:
 *     summary: Process a deposit transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account_id
 *               - amount
 *               - transaction_date
 *             properties:
 *               account_id:
 *                 type: string
 *                 format: uuid
 *                 example: 7a3e9140-5c22-4c9b-9f85-abcdef123456
 *               amount:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0.01
 *                 example: 500000
 *               transaction_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-02T10:00:00Z
 *     responses:
 *       201:
 *         description: Deposit processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Account not found
 */
router.post('/deposit', depositValidation, controller.processDeposit.bind(controller));

/**
 * @swagger
 * /api/transactions/withdrawal:
 *   post:
 *     summary: Process a withdrawal transaction with interest calculation
 *     tags: [Transactions]
 *     description: |
 *       Withdraws funds from an account. Interest is automatically calculated based on:
 *       - Yearly return rate of the deposito type
 *       - Number of complete months the deposit was held
 *       - Simple interest formula: (balance × yearly_return × months_held / 12)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account_id
 *               - amount
 *               - transaction_date
 *             properties:
 *               account_id:
 *                 type: string
 *                 format: uuid
 *                 example: 7a3e9140-5c22-4c9b-9f85-abcdef123456
 *               amount:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0.01
 *                 example: 500000
 *               transaction_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-02T10:00:00Z
 *     responses:
 *       201:
 *         description: Withdrawal processed successfully with interest calculated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Validation error or insufficient balance
 *       404:
 *         description: Account not found
 */
router.post('/withdrawal', withdrawalValidation, controller.processWithdrawal.bind(controller));

export default router;
