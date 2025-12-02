import { Request, Response, NextFunction } from 'express';
import { DepositoTypeService } from '../services/deposito.service';
import { ApiResponse } from '../types/api.types';

const depositoService = new DepositoTypeService();

export class DepositoTypeController {
    /**
     * GET /api/deposito-types
     */
    async getAllDepositoTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const depositoTypes = await depositoService.getAllDepositoTypes();

            const response: ApiResponse = {
                success: true,
                data: depositoTypes,
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/deposito-types/:id
     */
    async getDepositoTypeById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const depositoType = await depositoService.getDepositoTypeById(id);

            const response: ApiResponse = {
                success: true,
                data: depositoType,
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/deposito-types
     */
    async createDepositoType(req: Request, res: Response, next: NextFunction) {
        try {
            const depositoType = await depositoService.createDepositoType(req.body);

            const response: ApiResponse = {
                success: true,
                data: depositoType,
                message: 'Deposito type created successfully',
            };

            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/deposito-types/:id
     */
    async updateDepositoType(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const depositoType = await depositoService.updateDepositoType(id, req.body);

            const response: ApiResponse = {
                success: true,
                data: depositoType,
                message: 'Deposito type updated successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/deposito-types/:id
     */
    async deleteDepositoType(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await depositoService.deleteDepositoType(id);

            const response: ApiResponse = {
                success: true,
                message: 'Deposito type deleted successfully',
            };

            res.json(response);
        } catch (error) {
            next(error);
        }
    }
}
