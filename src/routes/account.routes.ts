import { Router } from 'express';
import { body } from 'express-validator';
import { AccountController } from '../controllers/account.controller';
import { validateRequest } from '../middleware/validator';

const router = Router();
const controller = new AccountController();

// Validation rules
const createAccountValidation = [
    body('customer_id')
        .isUUID()
        .withMessage('Valid customer ID is required'),
    body('deposito_type_id')
        .isUUID()
        .withMessage('Valid deposito type ID is required'),
    body('initial_balance')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Initial balance must be a positive number'),
    validateRequest,
];

// Routes
router.get('/', controller.getAllAccounts.bind(controller));
router.get('/:id', controller.getAccountById.bind(controller));
router.post('/', createAccountValidation, controller.createAccount.bind(controller));
router.delete('/:id', controller.deleteAccount.bind(controller));

export default router;
