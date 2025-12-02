import { Request, Response, NextFunction } from 'express';
import { AccountService } from '../services/account.service';
import { ApiResponse } from '../types/api.types';

const accountService = new AccountService();

export class AccountController {
    /**
     * GET /api/accounts
     */
    async getAllAccounts(req: Request, res: Response, next: NextFunction) {
        try {
            const { customer_id } = req.query;
            const accounts = await accountService.getAllAccounts(customer_id as string);

            const response: ApiResponse = {
                success: true,
                data: accounts,
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/accounts/:id
     */
    async getAccountById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const account = await accountService.getAccountById(id);

            const response: ApiResponse = {
                success: true,
                data: account,
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/accounts
     */
    async createAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const account = await accountService.createAccount(req.body);

            const response: ApiResponse = {
                success: true,
                data: account,
                message: 'Account created successfully',
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/accounts/:id
     */
    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await accountService.deleteAccount(id);

            const response: ApiResponse = {
                success: true,
                message: 'Account deleted successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }
}
