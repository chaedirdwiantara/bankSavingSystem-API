export interface Transaction {
    id: string;
    account_id: string;
    type: 'DEPOSIT' | 'WITHDRAWAL';
    amount: number;
    transaction_date: string;
    balance_before: number;
    balance_after: number;
    months_count?: number;
    interest_earned?: number;
    created_at: string;
}

export interface CreateDepositDTO {
    account_id: string;
    amount: number;
    transaction_date: string;
}

export interface CreateWithdrawalDTO {
    account_id: string;
    amount: number;
    transaction_date: string;
}

export interface TransactionWithDetails extends Transaction {
    account?: {
        id: string;
        customer_id: string;
        deposito_type_id: string;
    };
}
