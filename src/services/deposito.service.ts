import { supabase } from '../config/supabase';
import { DepositoType, CreateDepositoTypeDTO, UpdateDepositoTypeDTO } from '../types/deposito.types';
import { AppError } from '../middleware/errorHandler';

export class DepositoTypeService {
    /**
     * Get all deposito types
     */
    async getAllDepositoTypes(): Promise<DepositoType[]> {
        try {
            const { data, error } = await supabase
                .from('deposito_types')
                .select('*')
                .order('yearly_return', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error: any) {
            throw new AppError(error.message || 'Failed to fetch deposito types', 500);
        }
    }

    /**
     * Get deposito type by ID
     */
    async getDepositoTypeById(id: string): Promise<DepositoType> {
        try {
            const { data, error } = await supabase
                .from('deposito_types')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) throw new AppError('Deposito type not found', 404);

            return data;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to fetch deposito type', 500);
        }
    }

    /**
     * Create new deposito type
     */
    async createDepositoType(dto: CreateDepositoTypeDTO): Promise<DepositoType> {
        try {
            const { data, error } = await supabase
                .from('deposito_types')
                .insert([{
                    name: dto.name,
                    yearly_return: dto.yearly_return,
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error: any) {
            throw new AppError(error.message || 'Failed to create deposito type', 500);
        }
    }

    /**
     * Update deposito type
     */
    async updateDepositoType(id: string, dto: UpdateDepositoTypeDTO): Promise<DepositoType> {
        try {
            // Check if deposito type exists
            await this.getDepositoTypeById(id);

            const updateData: any = {
                updated_at: new Date().toISOString(),
            };

            if (dto.name !== undefined) updateData.name = dto.name;
            if (dto.yearly_return !== undefined) updateData.yearly_return = dto.yearly_return;

            const { data, error } = await supabase
                .from('deposito_types')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to update deposito type', 500);
        }
    }

    /**
     * Delete deposito type
     */
    async deleteDepositoType(id: string): Promise<void> {
        try {
            // Check if deposito type exists
            await this.getDepositoTypeById(id);

            const { error } = await supabase
                .from('deposito_types')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(error.message || 'Failed to delete deposito type', 500);
        }
    }
}
