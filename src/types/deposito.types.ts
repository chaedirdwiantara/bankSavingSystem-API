export interface DepositoType {
    id: string;
    name: string;
    yearly_return: number;
    created_at: string;
    updated_at: string;
}

export interface CreateDepositoTypeDTO {
    name: string;
    yearly_return: number;
}

export interface UpdateDepositoTypeDTO {
    name?: string;
    yearly_return?: number;
}
