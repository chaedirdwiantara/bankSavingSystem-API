export interface Customer {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CreateCustomerDTO {
    name: string;
}

export interface UpdateCustomerDTO {
    name: string;
}
