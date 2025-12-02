# 🚀 Supabase Setup Guide

This guide will help you set up Supabase for the Bank Saving System API.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "New project"
3. Sign in with your GitHub account
4. Create a new organization (if you don't have one)
5. Create a new project:
   - **Project name**: `bank-saving-system`
   - **Database password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to you
   - **Pricing plan**: Free (works perfectly for this project)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon)
2. Navigate to **API** section
3. You'll see:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Project API keys**
     - **anon/public key** - This is what we need

## Step 3: Setup Environment Variables

1. In the `BankSavingSystem-API` folder, create a `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and add your Supabase credentials:
   ```env
   PORT=3000
   NODE_ENV=development
   
   # Replace with your actual Supabase credentials
   SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   SUPABASE_ANON_KEY=your_long_anon_key_here
   ```

## Step 4: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor** (in the sidebar)
2. Click **+ New query**
3. Copy the ENTIRE content from `database/schema.sql` file
4. Paste it into the SQL editor
5. Click **RUN** button (or press Ctrl+Enter)

You should see a success message, and your tables will be created!

## Step 5: Verify Database Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see these tables:
   - ✅ `customers`
   - ✅ `deposito_types` (with 3 sample types: Bronze, Silver, Gold)
   - ✅ `accounts`
   - ✅ `transactions`

3. Click on `deposito_types` table - you should see 3 rows:
   - Deposito Bronze (3% yearly return)
   - Deposito Silver (5% yearly return)
   - Deposito Gold (7% yearly return)

4. Click on `customers` table - you should see 3 sample customers

## Step 6: Test the API Connection

1. In your terminal, navigate to the API folder:
   ```bash
   cd d:\WORKS\MOBILE\BankSavingSystem-API
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. You should see:
   ```
   🔄 Testing Supabase connection...
   ✅ Supabase connected successfully

   🚀 Server running on port 3000
   📍 Local: http://localhost:3000
   📍 API: http://localhost:3000/api
   📍 Health: http://localhost:3000/api/health
   ```

4. Open your browser and go to: `http://localhost:3000/api/health`

   You should see:
   ```json
   {
     "success": true,
     "message": "Bank Saving System API is running",
     "timestamp": "2025-12-02T..."
   }
   ```

## Step 7: Test API Endpoints

### Using curl (Command Line)

```bash
# Get all customers
curl http://localhost:3000/api/customers

# Get all deposito types
curl http://localhost:3000/api/deposito-types

# Create a new customer
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Customer\"}"
```

### Using REST Client Extension (VS Code)

1. Install **REST Client** extension in VS Code
2. Open `api-examples.http` file
3. Click on "Send Request" above any request
4. View response in the right panel

### Using Browser

- Customers: `http://localhost:3000/api/customers`
- Deposito Types: `http://localhost:3000/api/deposito-types`
- Accounts: `http://localhost:3000/api/accounts`
- Transactions: `http://localhost:3000/api/transactions`

## 🎯 Quick Test Flow

1. **Create a customer**:
   ```bash
   curl -X POST http://localhost:3000/api/customers \
     -H "Content-Type: application/json" \
     -d "{\"name\":\"Budi Santoso\"}"
   ```
   Copy the `id` from response (customer UUID)

2. **Get a deposito type ID**:
   ```bash
   curl http://localhost:3000/api/deposito-types
   ```
   Copy any deposito type `id`

3. **Create an account**:
   ```bash
   curl -X POST http://localhost:3000/api/accounts \
     -H "Content-Type: application/json" \
     -d "{\"customer_id\":\"CUSTOMER_UUID\",\"deposito_type_id\":\"DEPOSITO_UUID\",\"initial_balance\":1000000}"
   ```
   Copy the account `id`

4. **Deposit money**:
   ```bash
   curl -X POST http://localhost:3000/api/transactions/deposit \
     -H "Content-Type: application/json" \
     -d "{\"account_id\":\"ACCOUNT_UUID\",\"amount\":500000,\"transaction_date\":\"2025-12-02T12:00:00Z\"}"
   ```

5. **Withdraw with interest calculation**:
   ```bash
   curl -X POST http://localhost:3000/api/transactions/withdrawal \
     -H "Content-Type: application/json" \
     -d "{\"account_id\":\"ACCOUNT_UUID\",\"amount\":200000,\"transaction_date\":\"2025-06-02T12:00:00Z\"}"
   ```
   Note the `interest_earned` in the response!

## 🔧 Troubleshooting

### Connection Error
- ❌ Error: "Missing Supabase environment variables"
- ✅ Solution: Make sure `.env` file exists and has correct credentials

### Database Error
- ❌ Error: "relation 'customers' does not exist"
- ✅ Solution: Run the `database/schema.sql` in Supabase SQL Editor

### CORS Error (from mobile app)
- ❌ Error: "Access-Control-Allow-Origin"
- ✅ Solution: The API already has CORS enabled, but you can update the allowed origins in `src/server.ts` if needed

## 📚 Next Steps

After successful setup:

1. ✅ Backend API is running on `http://localhost:3000`
2. ⏭️ Update mobile app to connect to this API
3. ⏭️ Deploy to Railway for production use

---

**Need help?** Check the main `README.md` for more details!
