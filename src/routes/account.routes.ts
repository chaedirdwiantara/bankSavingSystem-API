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

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     parameters:
 *       - in: query
 *         name: customer_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by customer ID
 *     responses:
 *       200:
 *         description: List of accounts
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
 *                     $ref: '#/components/schemas/Account'
 */
router.get('/', controller.getAllAccounts.bind(controller));

/**
 * @swagger
 * /api/accounts/{id}:
 *   get:
 *     summary: Get account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account details with customer and deposito type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 */
router.get('/:id', controller.getAccountById.bind(controller));

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - deposito_type_id
 *             properties:
 *               customer_id:
 *                 type: string
 *                 format: uuid
 *                 example: 9171310b-c6cf-4261-b40d-fa7f84b33dd6
 *               deposito_type_id:
 *                 type: string
 *                 format: uuid
 *                 example: 8c8e3a40-9b8d-4d7b-9c8a-1234567890ab
 *               initial_balance:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 example: 1000000
 *                 description: Initial deposit amount (optional, default 0)
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Account'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Customer or deposito type not found
 */
router.post('/', createAccountValidation, controller.createAccount.bind(controller));

/**
 * @swagger
 * /api/accounts/{id}:
 *   delete:
 *     summary: Delete account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       404:
 *         description: Account not found
 */
router.delete('/:id', controller.deleteAccount.bind(controller));

export default router;
