export interface Account {
    id: string;
    customer_id: string;
    deposito_type_id: string;
    balance: number;
    created_at: string;
    updated_at: string;
}

export interface CreateAccountDTO {
    customer_id: string;
    deposito_type_id: string;
    initial_balance?: number;
}

export interface UpdateAccountDTO {
    balance: number;
}

export interface AccountWithDetails extends Account {
    customer?: {
        id: string;
        name: string;
    };
    deposito_type?: {
        id: string;
        name: string;
        yearly_return: number;
    };
}
