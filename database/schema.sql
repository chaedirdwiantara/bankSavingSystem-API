-- Bank Saving System Database Schema
-- Database: PostgreSQL (Supabase)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if exist (for fresh setup)
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS deposito_types CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- Customers Table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deposito Types Table
CREATE TABLE deposito_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    yearly_return DECIMAL(5, 4) NOT NULL CHECK (yearly_return >= 0 AND yearly_return <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accounts Table
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    deposito_type_id UUID NOT NULL REFERENCES deposito_types(id) ON DELETE RESTRICT,
    balance DECIMAL(15, 2) DEFAULT 0 CHECK (balance >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('DEPOSIT', 'WITHDRAWAL')),
    amount DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
    transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
    balance_before DECIMAL(15, 2) NOT NULL,
    balance_after DECIMAL(15, 2) NOT NULL,
    months_count INTEGER,
    interest_earned DECIMAL(15, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_accounts_customer_id ON accounts(customer_id);
CREATE INDEX idx_accounts_deposito_type_id ON accounts(deposito_type_id);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);

-- Insert sample deposito types
INSERT INTO deposito_types (name, yearly_return) VALUES
    ('Deposito Bronze', 0.03),
    ('Deposito Silver', 0.05),
    ('Deposito Gold', 0.07);

-- Insert sample customers (optional)
INSERT INTO customers (name) VALUES
    ('John Doe'),
    ('Jane Smith'),
    ('Bob Johnson');

COMMENT ON TABLE customers IS 'Bank customers/nasabah information';
COMMENT ON TABLE deposito_types IS 'Types of deposito with different interest rates';
COMMENT ON TABLE accounts IS 'Customer accounts linked to deposito types';
COMMENT ON TABLE transactions IS 'Deposit and withdrawal transaction history';
COMMENT ON COLUMN deposito_types.yearly_return IS 'Annual interest rate (0.05 = 5%)';
COMMENT ON COLUMN transactions.months_count IS 'Number of months for withdrawal interest calculation';
COMMENT ON COLUMN transactions.interest_earned IS 'Interest earned on withdrawal';
