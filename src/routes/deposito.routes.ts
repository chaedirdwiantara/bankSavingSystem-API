import { Router } from 'express';
import { body } from 'express-validator';
import { DepositoTypeController } from '../controllers/deposito.controller';
import { validateRequest } from '../middleware/validator';

const router = Router();
const controller = new DepositoTypeController();

// Validation rules
const createDepositoTypeValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    body('yearly_return')
        .isFloat({ min: 0, max: 1 })
        .withMessage('Yearly return must be between 0 and 1 (e.g., 0.05 for 5%)'),
    validateRequest,
];

const updateDepositoTypeValidation = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name cannot be empty'),
    body('yearly_return')
        .optional()
        .isFloat({ min: 0, max: 1 })
        .withMessage('Yearly return must be between 0 and 1'),
    validateRequest,
];

// Routes

/**
 * @swagger
 * /api/deposito-types:
 *   get:
 *     summary: Get all deposito types
 *     tags: [Deposito Types]
 *     responses:
 *       200:
 *         description: List of all deposito types
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
 *                     $ref: '#/components/schemas/DepositoType'
 */
router.get('/', controller.getAllDepositoTypes.bind(controller));

/**
 * @swagger
 * /api/deposito-types/{id}:
 *   get:
 *     summary: Get deposito type by ID
 *     tags: [Deposito Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Deposito type ID
 *     responses:
 *       200:
 *         description: Deposito type details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/DepositoType'
 *       404:
 *         description: Deposito type not found
 */
router.get('/:id', controller.getDepositoTypeById.bind(controller));

/**
 * @swagger
 * /api/deposito-types:
 *   post:
 *     summary: Create a new deposito type
 *     tags: [Deposito Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - yearly_return
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gold Deposito
 *               yearly_return:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 maximum: 1
 *                 example: 0.05
 *                 description: Annual return as decimal (0.05 = 5%)
 *     responses:
 *       201:
 *         description: Deposito type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/DepositoType'
 *       400:
 *         description: Validation error
 */
router.post('/', createDepositoTypeValidation, controller.createDepositoType.bind(controller));

/**
 * @swagger
 * /api/deposito-types/{id}:
 *   put:
 *     summary: Update deposito type
 *     tags: [Deposito Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Deposito type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Platinum Deposito
 *               yearly_return:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 maximum: 1
 *                 example: 0.08
 *     responses:
 *       200:
 *         description: Deposito type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/DepositoType'
 *       404:
 *         description: Deposito type not found
 */
router.put('/:id', updateDepositoTypeValidation, controller.updateDepositoType.bind(controller));

/**
 * @swagger
 * /api/deposito-types/{id}:
 *   delete:
 *     summary: Delete deposito type
 *     tags: [Deposito Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Deposito type ID
 *     responses:
 *       200:
 *         description: Deposito type deleted successfully
 *       404:
 *         description: Deposito type not found
 */
router.delete('/:id', controller.deleteDepositoType.bind(controller));

export default router;
