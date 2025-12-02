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
router.get('/', controller.getAllTransactions.bind(controller));
router.post('/deposit', depositValidation, controller.processDeposit.bind(controller));
router.post('/withdrawal', withdrawalValidation, controller.processWithdrawal.bind(controller));

export default router;
