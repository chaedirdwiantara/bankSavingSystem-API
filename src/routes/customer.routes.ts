import { Router } from 'express';
import { body } from 'express-validator';
import { CustomerController } from '../controllers/customer.controller';
import { validateRequest } from '../middleware/validator';

const router = Router();
const controller = new CustomerController();

// Validation rules
const createCustomerValidation = [
    body('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    validateRequest,
];

const updateCustomerValidation = [
    body('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    validateRequest,
];

// Routes
router.get('/', controller.getAllCustomers.bind(controller));
router.get('/:id', controller.getCustomerById.bind(controller));
router.post('/', createCustomerValidation, controller.createCustomer.bind(controller));
router.put('/:id', updateCustomerValidation, controller.updateCustomer.bind(controller));
router.delete('/:id', controller.deleteCustomer.bind(controller));

export default router;
