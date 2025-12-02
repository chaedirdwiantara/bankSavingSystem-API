import { supabase } from '../config/supabase';
import {
    Transaction,
    TransactionWithDetails,
    CreateDepositDTO,
    CreateWithdrawalDTO,
} from '../types/transaction.types';
import { AppError } from '../middleware/errorHandler';
import { AccountService } from './account.service';

export class TransactionService {
    private accountService: AccountService;

    constructor() {
        this.accountService = new AccountService();
    }

    /**
     * Get all transactions with optional filtering by account
     */
    async getAllTransactions(accountId?: string): Promise<TransactionWithDetails[]> {
        try {
            let query = supabase
                .from('transactions')
                .select(`
                    *,
                    account:accounts(id, customer_id, deposito_type_id)
                `)
                .order('transaction_date', { ascending: false });

            if (accountId) {
                query = query.eq('account_id', accountId);
            }

            const { data, error } = await query;

            if (error) throw error;
            return data || [];
        } catch (error: any) {
            throw new AppError(error.message || 'Failed to fetch transactions', 500);
        }
    }

    /**
     * Process deposit transaction
     */
    async processDeposit(dto: CreateDepositDTO): Promise<Transaction> {
        try {
            // Get account details
            const account = await this.accountService.getAccountById(dto.account_id);

            const balanceBefore = account.balance;
            const balanceAfter = balanceBefore + dto.amount;

            // Create transaction record
            const { data: transaction, error: transactionError } = await supabase
                .from('transactions')
                .insert([{
                    account_id: dto.account_id,
                    type: 'DEPOSIT',
                    amount: dto.amount,
                    transaction_date: dto.transaction_date,
                    balance_before: balanceBefore,
                    balance_after: balanceAfter,
                }])
                .select()
                .single();

            if (transactionError) throw transactionError;

            // Update account balance
            await this.accountService.updateAccountBalance(dto.account_id, balanceAfter);

            return transaction;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to process deposit', 500);
        }
    }

    /**
     * Process withdrawal transaction with interest calculation
     */
    async processWithdrawal(dto: CreateWithdrawalDTO): Promise<Transaction> {
        try {
            // Get account with deposito type details
            const account = await this.accountService.getAccountById(dto.account_id);

            if (!account.deposito_type) {
                throw new AppError('Deposito type not found for this account', 404);
            }

            // Calculate duration in months
            const accountCreatedDate = new Date(account.created_at);
            const withdrawalDate = new Date(dto.transaction_date);
            const monthsDiff = this.calculateMonthsDifference(accountCreatedDate, withdrawalDate);

            // Calculate interest
            const yearlyReturn = account.deposito_type.yearly_return;
            const monthlyReturn = yearlyReturn / 12;
            const interestEarned = account.balance * monthsDiff * monthlyReturn;

            const balanceBefore = account.balance;
            const totalWithdrawal = dto.amount;
            const balanceAfter = balanceBefore - totalWithdrawal + interestEarned;

            // Validate sufficient balance
            if (balanceAfter < 0) {
                throw new AppError('Insufficient balance for withdrawal', 400);
            }

            // Create transaction record
            const { data: transaction, error: transactionError } = await supabase
                .from('transactions')
                .insert([{
                    account_id: dto.account_id,
                    type: 'WITHDRAWAL',
                    amount: totalWithdrawal,
                    transaction_date: dto.transaction_date,
                    balance_before: balanceBefore,
                    balance_after: balanceAfter,
                    months_count: monthsDiff,
                    interest_earned: interestEarned,
                }])
                .select()
                .single();

            if (transactionError) throw transactionError;

            // Update account balance
            await this.accountService.updateAccountBalance(dto.account_id, balanceAfter);

            return transaction;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to process withdrawal', 500);
        }
    }

    /**
     * Calculate months difference between two dates
     */
    private calculateMonthsDifference(startDate: Date, endDate: Date): number {
        const years = endDate.getFullYear() - startDate.getFullYear();
        const months = endDate.getMonth() - startDate.getMonth();
        return years * 12 + months;
    }
}
