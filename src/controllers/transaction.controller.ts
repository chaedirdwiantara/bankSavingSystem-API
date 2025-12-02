import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction.service';
import { ApiResponse } from '../types/api.types';

const transactionService = new TransactionService();

export class TransactionController {
    /**
     * GET /api/transactions
     */
    async getAllTransactions(req: Request, res: Response, next: NextFunction) {
        try {
            const { account_id } = req.query;
            const transactions = await transactionService.getAllTransactions(account_id as string);

            const response: ApiResponse = {
                success: true,
                data: transactions,
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/transactions/deposit
     */
    async processDeposit(req: Request, res: Response, next: NextFunction) {
        try {
            const transaction = await transactionService.processDeposit(req.body);

            const response: ApiResponse = {
                success: true,
                data: transaction,
                message: 'Deposit processed successfully',
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/transactions/withdrawal
     */
    async processWithdrawal(req: Request, res: Response, next: NextFunction) {
        try {
            const transaction = await transactionService.processWithdrawal(req.body);

            const response: ApiResponse = {
                success: true,
                data: transaction,
                message: 'Withdrawal processed successfully',
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
}
