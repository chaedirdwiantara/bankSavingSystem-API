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
router.get('/', controller.getAllDepositoTypes.bind(controller));
router.get('/:id', controller.getDepositoTypeById.bind(controller));
router.post('/', createDepositoTypeValidation, controller.createDepositoType.bind(controller));
router.put('/:id', updateDepositoTypeValidation, controller.updateDepositoType.bind(controller));
router.delete('/:id', controller.deleteDepositoType.bind(controller));

export default router;
