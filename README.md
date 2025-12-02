# Bank Saving System API

Backend API for Bank Saving System mobile application built with Node.js, Express, TypeScript, and Supabase.

## 🚀 Features

- ✅ **Customer Management** - CRUD operations for bank customers
- ✅ **Deposito Types** - Manage different deposito types with varying interest rates
- ✅ **Account Management** - Create and manage customer accounts
- ✅ **Transactions** - Process deposits and withdrawals with automatic interest calculation
- ✅ **RESTful API** - Clean and well-documented API endpoints
- ✅ **TypeScript** - Type-safe code with full TypeScript support
- ✅ **Validation** - Request validation with express-validator
- ✅ **Error Handling** - Centralized error handling middleware

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Supabase account (free tier works)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BankSavingSystem-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Supabase credentials:
   ```env
   PORT=3000
   NODE_ENV=development
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Setup Database**

   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the SQL script from `database/schema.sql`

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### Health Check
```
GET /api/health
```

### Customers
```
GET    /api/customers          - Get all customers (supports ?search=name)
GET    /api/customers/:id      - Get customer by ID
POST   /api/customers          - Create new customer
PUT    /api/customers/:id      - Update customer
DELETE /api/customers/:id      - Delete customer
```

### Deposito Types
```
GET    /api/deposito-types     - Get all deposito types
GET    /api/deposito-types/:id - Get deposito type by ID
POST   /api/deposito-types     - Create new deposito type
PUT    /api/deposito-types/:id - Update deposito type
DELETE /api/deposito-types/:id - Delete deposito type
```

### Accounts
```
GET    /api/accounts           - Get all accounts (supports ?customer_id=uuid)
GET    /api/accounts/:id       - Get account by ID (with customer & deposito details)
POST   /api/accounts           - Create new account
DELETE /api/accounts/:id       - Delete account
```

### Transactions
```
GET    /api/transactions       - Get all transactions (supports ?account_id=uuid)
POST   /api/transactions/deposit    - Process deposit
POST   /api/transactions/withdrawal - Process withdrawal (with interest calculation)
```

## 📝 Request/Response Examples

### Create Customer
**Request:**
```json
POST /api/customers
{
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "created_at": "2025-12-02T12:00:00Z",
    "updated_at": "2025-12-02T12:00:00Z"
  },
  "message": "Customer created successfully"
}
```

### Create Account
**Request:**
```json
POST /api/accounts
{
  "customer_id": "customer-uuid",
  "deposito_type_id": "deposito-type-uuid",
  "initial_balance": 1000000
}
```

### Process Withdrawal (with Interest Calculation)
**Request:**
```json
POST /api/transactions/withdrawal
{
  "account_id": "account-uuid",
  "amount": 500000,
  "transaction_date": "2025-12-02T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "transaction-uuid",
    "account_id": "account-uuid",
    "type": "WITHDRAWAL",
    "amount": 500000,
    "transaction_date": "2025-12-02T12:00:00Z",
    "balance_before": 1000000,
    "balance_after": 525000,
    "months_count": 6,
    "interest_earned": 25000,
    "created_at": "2025-12-02T12:00:00Z"
  },
  "message": "Withdrawal processed successfully"
}
```

## 🧮 Interest Calculation Logic

When a withdrawal is processed:
1. Calculate months between account creation and withdrawal date
2. Calculate monthly interest: `yearly_return / 12`
3. Calculate interest earned: `balance * months * monthly_return`
4. New balance: `old_balance - withdrawal_amount + interest_earned`

Example:
- Initial balance: Rp 1,000,000
- Deposito type: Gold (7% yearly)
- Duration: 6 months
- Monthly return: 7% / 12 = 0.583%
- Interest earned: 1,000,000 × 6 × 0.00583 ≈ Rp 35,000
- Withdrawal amount: Rp 500,000
- Final balance: 1,000,000 - 500,000 + 35,000 = Rp 535,000

## 📁 Project Structure

```
src/
├── config/          # Configuration files (Supabase)
├── controllers/     # Request handlers
├── middleware/      # Custom middleware (error handler, validator)
├── routes/          # API routes
├── services/        # Business logic layer
├── types/           # TypeScript interfaces
└── server.ts        # Express app entry point

database/
└── schema.sql       # PostgreSQL database schema
```

## 🔒 Error Handling

All errors are handled centrally and return consistent JSON responses:

```json
{
  "success": false,
  "error": "Error message",
  "stack": "Error stack trace (development only)"
}
```

## 🚢 Deployment

### Deploy to Railway

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login and deploy:
   ```bash
   railway login
   railway init
   railway up
   ```

3. Add environment variables in Railway dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `NODE_ENV=production`

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📄 License

ISC

## 👨‍💻 Author

Bank Saving System Team
