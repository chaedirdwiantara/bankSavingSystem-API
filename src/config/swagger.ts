import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bank Saving System API',
            version: '1.0.0',
            description: 'RESTful API for Bank Saving System - Manage customers, deposito types, accounts, and transactions',
            contact: {
                name: 'API Support',
                email: 'support@banksavingsystem.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
            {
                url: 'https://banksavingsystem-api-production.up.railway.app',
                description: 'Production server (Railway)',
            },
        ],
        components: {
            schemas: {
                Customer: {
                    type: 'object',
                    required: ['id', 'name', 'created_at', 'updated_at'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Customer unique identifier',
                        },
                        name: {
                            type: 'string',
                            description: 'Customer full name',
                            example: 'John Doe',
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                        },
                    },
                },
                DepositoType: {
                    type: 'object',
                    required: ['id', 'name', 'yearly_return', 'created_at', 'updated_at'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Deposito type unique identifier',
                        },
                        name: {
                            type: 'string',
                            description: 'Deposito type name',
                            example: 'Gold Deposito',
                        },
                        yearly_return: {
                            type: 'number',
                            format: 'decimal',
                            description: 'Annual interest rate (decimal)',
                            example: 0.05,
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                        },
                    },
                },
                Account: {
                    type: 'object',
                    required: ['id', 'customer_id', 'deposito_type_id', 'balance', 'created_at', 'updated_at'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Account unique identifier',
                        },
                        customer_id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Customer ID',
                        },
                        deposito_type_id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Deposito type ID',
                        },
                        balance: {
                            type: 'number',
                            format: 'decimal',
                            description: 'Current account balance',
                            example: 1000000,
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                        },
                        customer: {
                            $ref: '#/components/schemas/Customer',
                        },
                        deposito_type: {
                            $ref: '#/components/schemas/DepositoType',
                        },
                    },
                },
                Transaction: {
                    type: 'object',
                    required: ['id', 'account_id', 'type', 'amount', 'transaction_date', 'balance_before', 'balance_after', 'created_at'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Transaction unique identifier',
                        },
                        account_id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Account ID',
                        },
                        type: {
                            type: 'string',
                            enum: ['deposit', 'withdrawal'],
                            description: 'Transaction type',
                        },
                        amount: {
                            type: 'number',
                            format: 'decimal',
                            description: 'Transaction amount',
                            example: 500000,
                        },
                        transaction_date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Transaction date',
                        },
                        balance_before: {
                            type: 'number',
                            format: 'decimal',
                            description: 'Balance before transaction',
                        },
                        balance_after: {
                            type: 'number',
                            format: 'decimal',
                            description: 'Balance after transaction',
                        },
                        interest_earned: {
                            type: 'number',
                            format: 'decimal',
                            description: 'Interest earned (withdrawal only)',
                            nullable: true,
                        },
                        months_held: {
                            type: 'number',
                            description: 'Months held (withdrawal only)',
                            nullable: true,
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                    },
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true,
                        },
                        data: {
                            type: 'object',
                            description: 'Response data',
                        },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        error: {
                            type: 'string',
                            description: 'Error message',
                            example: 'Resource not found',
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: 'Customers',
                description: 'Customer management endpoints',
            },
            {
                name: 'Deposito Types',
                description: 'Deposito type management endpoints',
            },
            {
                name: 'Accounts',
                description: 'Account management endpoints',
            },
            {
                name: 'Transactions',
                description: 'Transaction endpoints (deposit/withdrawal)',
            },
            {
                name: 'Health',
                description: 'API health check',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/server.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
