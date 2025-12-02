import { supabase } from '../config/supabase';
import { Account, AccountWithDetails, CreateAccountDTO, UpdateAccountDTO } from '../types/account.types';
import { AppError } from '../middleware/errorHandler';

export class AccountService {
    /**
     * Get all accounts with optional filtering by customer
     */
    async getAllAccounts(customerId?: string): Promise<AccountWithDetails[]> {
        try {
            let query = supabase
                .from('accounts')
                .select(`
                    *,
                    customer:customers(id, name),
                    deposito_type:deposito_types(id, name, yearly_return)
                `)
                .order('created_at', { ascending: false });

            if (customerId) {
                query = query.eq('customer_id', customerId);
            }

            const { data, error } = await query;

            if (error) throw error;
            return data || [];
        } catch (error: any) {
            throw new AppError(error.message || 'Failed to fetch accounts', 500);
        }
    }

    /**
     * Get account by ID with details
     */
    async getAccountById(id: string): Promise<AccountWithDetails> {
        try {
            const { data, error } = await supabase
                .from('accounts')
                .select(`
                    *,
                    customer:customers(id, name),
                    deposito_type:deposito_types(id, name, yearly_return)
                `)
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) throw new AppError('Account not found', 404);

            return data;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to fetch account', 500);
        }
    }

    /**
     * Create new account
     */
    async createAccount(dto: CreateAccountDTO): Promise<Account> {
        try {
            // Verify customer exists
            const { data: customer, error: customerError } = await supabase
                .from('customers')
                .select('id')
                .eq('id', dto.customer_id)
                .single();

            if (customerError || !customer) {
                throw new AppError('Customer not found', 404);
            }

            // Verify deposito type exists
            const { data: depositoType, error: depositoError } = await supabase
                .from('deposito_types')
                .select('id')
                .eq('id', dto.deposito_type_id)
                .single();

            if (depositoError || !depositoType) {
                throw new AppError('Deposito type not found', 404);
            }

            const { data, error } = await supabase
                .from('accounts')
                .insert([{
                    customer_id: dto.customer_id,
                    deposito_type_id: dto.deposito_type_id,
                    balance: dto.initial_balance || 0,
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to create account', 500);
        }
    }

    /**
     * Update account balance
     */
    async updateAccountBalance(id: string, newBalance: number): Promise<Account> {
        try {
            // Check if account exists
            await this.getAccountById(id);

            const { data, error } = await supabase
                .from('accounts')
                .update({
                    balance: newBalance,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to update account', 500);
        }
    }

    /**
     * Delete account
     */
    async deleteAccount(id: string): Promise<void> {
        try {
            // Check if account exists
            await this.getAccountById(id);

            const { error } = await supabase
                .from('accounts')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to delete account', 500);
        }
    }
}
