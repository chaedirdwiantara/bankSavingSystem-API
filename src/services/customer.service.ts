import { supabase } from '../config/supabase';
import { Customer, CreateCustomerDTO, UpdateCustomerDTO } from '../types/customer.types';
import { AppError } from '../middleware/errorHandler';

export class CustomerService {
    /**
     * Get all customers with optional search
     */
    async getAllCustomers(search?: string): Promise<Customer[]> {
        try {
            let query = supabase
                .from('customers')
                .select('*')
                .order('created_at', { ascending: false });

            if (search) {
                query = query.ilike('name', `%${search}%`);
            }

            const { data, error } = await query;

            if (error) throw error;
            return data || [];
        } catch (error: any) {
            throw new AppError(error.message || 'Failed to fetch customers', 500);
        }
    }

    /**
     * Get customer by ID
     */
    async getCustomerById(id: string): Promise<Customer> {
        try {
            const { data, error } = await supabase
                .from('customers')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) throw new AppError('Customer not found', 404);

            return data;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to fetch customer', 500);
        }
    }

    /**
     * Create new customer
     */
    async createCustomer(dto: CreateCustomerDTO): Promise<Customer> {
        try {
            const { data, error } = await supabase
                .from('customers')
                .insert([{
                    name: dto.name,
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error: any) {
            throw new AppError(error.message || 'Failed to create customer', 500);
        }
    }

    /**
     * Update customer
     */
    async updateCustomer(id: string, dto: UpdateCustomerDTO): Promise<Customer> {
        try {
            // Check if customer exists
            await this.getCustomerById(id);

            const { data, error } = await supabase
                .from('customers')
                .update({
                    name: dto.name,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to update customer', 500);
        }
    }

    /**
     * Delete customer
     */
    async deleteCustomer(id: string): Promise<void> {
        try {
            // Check if customer exists
            await this.getCustomerById(id);

            const { error } = await supabase
                .from('customers')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to delete customer', 500);
        }
    }
}
