import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service';
import { ApiResponse } from '../types/api.types';

const customerService = new CustomerService();

export class CustomerController {
    /**
     * GET /api/customers
     */
    async getAllCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const { search } = req.query;
            const customers = await customerService.getAllCustomers(search as string);

            const response: ApiResponse = {
                success: true,
                data: customers,
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/customers/:id
     */
    async getCustomerById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const customer = await customerService.getCustomerById(id);

            const response: ApiResponse = {
                success: true,
                data: customer,
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/customers
     */
    async createCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const customer = await customerService.createCustomer(req.body);

            const response: ApiResponse = {
                success: true,
                data: customer,
                message: 'Customer created successfully',
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/customers/:id
     */
    async updateCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const customer = await customerService.updateCustomer(id, req.body);

            const response: ApiResponse = {
                success: true,
                data: customer,
                message: 'Customer updated successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/customers/:id
     */
    async deleteCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await customerService.deleteCustomer(id);

            const response: ApiResponse = {
                success: true,
                message: 'Customer deleted successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }
}
