# 🚀 Railway Deployment Guide - PostgreSQL + Backend

Panduan lengkap deploy **Bank Saving System API** ke Railway dengan PostgreSQL database.

---

## 📋 Prerequisites

- ✅ Akun GitHub (untuk login Railway)
- ✅ Project backend sudah siap (di `BankSavingSystem-API/`)
- ✅ Koneksi internet

---

## 🎯 Step 1: Create Railway Account

1. Buka [railway.app](https://railway.app)
2. Klik **"Login"** atau **"Start a New Project"**
3. Login dengan **GitHub account** Anda
4. Authorize Railway untuk akses GitHub

✅ **Berhasil**: Anda akan masuk ke Railway Dashboard

---

## 🗄️ Step 2: Create PostgreSQL Database

1. Di Railway Dashboard, klik **"New Project"**
2. Pilih **"Provision PostgreSQL"**
   
   ![Railway akan membuat PostgreSQL database untuk Anda]

3. Tunggu beberapa detik, database akan otomatis dibuat

4. Klik pada **PostgreSQL service** yang baru dibuat

5. Pergi ke tab **"Variables"**
   
   Anda akan melihat environment variables yang sudah otomatis dibuat:
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`
   - `DATABASE_URL` ← **Yang kita butuhkan!**

6. **Copy** value dari `DATABASE_URL`
   
   Format-nya seperti ini:
   ```
   postgresql://postgres:password@host.railway.app:5432/railway
   ```

✅ **Database sudah siap!** Sekarang kita setup tabel-tabelnya.

---

## 📊 Step 3: Run Database Schema

Kita perlu eksekusi SQL schema untuk membuat tabel-tabel.

### Opsi A: Menggunakan Railway Database Tab (Mudah)

1. Di PostgreSQL service, klik tab **"Data"**
2. Klik **"Query"** button
3. Buka file `database/schema.sql` dari folder backend Anda
4. **Copy semua isinya**
5. **Paste** ke Railway Query editor
6. Klik **"Run Query"** atau tekan `Ctrl+Enter`

✅ **Berhasil**: Tabel `customers`, `deposito_types`, `accounts`, `transactions` sudah dibuat!

### Opsi B: Menggunakan psql (Terminal)

Jika Anda familiar dengan terminal:

```bash
# Install PostgreSQL client dulu (jika belum ada)
# Windows: Download dari postgresql.org

# Connect ke database
psql "postgresql://postgres:password@host.railway.app:5432/railway"

# Copy-paste isi schema.sql ke terminal
# Atau:
\i d:/WORKS/MOBILE/BankSavingSystem-API/database/schema.sql
```

---

## 🔧 Step 4: Prepare Backend for Deployment

### 4.1 Update Database Connection Code

Buka file `src/config/supabase.ts` dan kita akan mengubahnya untuk support PostgreSQL:

**RENAME file** dari `supabase.ts` menjadi `database.ts`

Saya akan buatkan kode baru untuk Anda di langkah berikutnya.

### 4.2 Initialize Git Repository (Jika Belum)

```bash
cd d:\WORKS\MOBILE\BankSavingSystem-API

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial backend setup"
```

### 4.3 Push to GitHub

1. Buka [github.com](https://github.com)
2. Klik **"New repository"**
3. Nama repository: `BankSavingSystem-API`
4. **Jangan** centang "Initialize with README"
5. Klik **"Create repository"**

6. Di terminal, jalankan commands yang diberikan GitHub:
   ```bash
   git remote add origin https://github.com/USERNAME/BankSavingSystem-API.git
   git branch -M main
   git push -u origin main
   ```

✅ **Kode sudah di GitHub!**

---

## 🚀 Step 5: Deploy Backend to Railway

1. Kembali ke Railway Dashboard
2. Di project yang sama (yang sudah ada PostgreSQL), klik **"New Service"**
3. Pilih **"GitHub Repo"**
4. Connect GitHub account Anda (jika belum)
5. Pilih repository **`BankSavingSystem-API`**

Railway akan otomatis:
- ✅ Detect Node.js project
- ✅ Run `npm install`
- ✅ Build project dengan `npm run build`
- ✅ Start server dengan `npm start`

### 5.1 Add Environment Variables

1. Klik pada **Backend service** yang baru di-deploy
2. Pergi ke tab **"Variables"**
3. Klik **"New Variable"**
4. Tambahkan:

   ```
   NODE_ENV=production
   PORT=3000
   ```

5. **Untuk DATABASE_URL**: 
   - Klik **"Reference"**
   - Pilih **PostgreSQL service**
   - Pilih variable **`DATABASE_URL`**
   
   Atau manual copy-paste DATABASE_URL dari PostgreSQL service.

### 5.2 Verify Deployment

1. Tunggu deployment selesai (biasanya 1-2 menit)
2. Lihat **Logs** untuk memastikan tidak ada error
3. Cari URL deployment:
   - Tab **"Settings"**
   - Bagian **"Domains"**
   - Klik **"Generate Domain"**
   
   Anda akan dapat URL seperti:
   ```
   https://banksavingsystem-api-production.up.railway.app
   ```

✅ **Backend sudah LIVE!**

---

## 🧪 Step 6: Test Deployed API

### Test 1: Health Check

Buka browser, akses:
```
https://your-app-name.up.railway.app/api/health
```

Response yang diharapkan:
```json
{
  "success": true,
  "message": "Bank Saving System API is running",
  "timestamp": "2025-12-02T..."
}
```

### Test 2: Get Deposito Types

```
https://your-app-name.up.railway.app/api/deposito-types
```

Anda harus melihat 3 deposito types (Bronze, Silver, Gold).

### Test 3: Create Customer (Menggunakan curl)

```bash
curl -X POST https://your-app-name.up.railway.app/api/customers \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Customer\"}"
```

---

## 📱 Step 7: Update Mobile App

Edit file config di mobile app untuk connect ke backend:

```typescript
// src/config/api.ts (create this file)
export const API_BASE_URL = 'https://your-app-name.up.railway.app/api';

// Ganti 'your-app-name' dengan URL Railway Anda
```

---

## 🎉 Deployment Complete!

### Summary

- ✅ **PostgreSQL Database**: Hosted di Railway
- ✅ **Backend API**: Deployed di Railway
- ✅ **Database Schema**: Tables created
- ✅ **API Endpoints**: Accessible via HTTPS
- ✅ **Auto-Deploy**: Setiap push ke GitHub akan auto-deploy

### Your URLs

- **API Base URL**: `https://your-app-name.up.railway.app`
- **Health Check**: `https://your-app-name.up.railway.app/api/health`
- **API Docs**: Lihat `README.md` untuk all endpoints

---

## 🔧 Troubleshooting

### Error: "Cannot connect to database"

**Solusi**:
1. Pastikan environment variable `DATABASE_URL` sudah di-set
2. Pastikan reference ke PostgreSQL service benar
3. Check logs di Railway untuk error detail

### Error: "Module not found"

**Solusi**:
1. Pastikan `package.json` lengkap
2. Di Railway service settings, coba **"Redeploy"**

### Ingin lihat logs

1. Klik backend service
2. Tab **"Deployments"**
3. Klik deployment terbaru
4. Tab **"Logs"**

### Database management

Untuk melihat data di database:
1. Klik PostgreSQL service
2. Tab **"Data"**
3. Pilih table (customers, accounts, dll)
4. Lihat data, edit, atau delete

---

## 💡 Tips

1. **Auto-deploy**: Setiap kali Anda push ke GitHub, Railway akan otomatis deploy!
2. **Environment Variables**: Bisa di-update tanpa redeploy
3. **Logs**: Akses real-time logs untuk debugging
4. **Rollback**: Bisa rollback ke deployment sebelumnya kalau ada masalah

---

## ⚠️ Catatan Penting

### Free Tier Limits (Railway)

- **Monthly Usage**: $5 credit gratis
- **Sleep Mode**: Service tidak akan sleep (always on)
- **Egress**: 100GB transfer per bulan
- **Database**: PostgreSQL included dalam credit

Untuk development/testing, ini lebih dari cukup!

### Jika Melebihi Limit

Opsi alternatif:
- **Render.com**: PostgreSQL + Web Service gratis
- **Fly.io**: PostgreSQL + App deployment gratis
- **Neon.tech**: PostgreSQL standalone (generous free tier)

---

**Need Help?** Railway punya dokumentasi bagus: [docs.railway.app](https://docs.railway.app)

**Selamat! Backend Anda sudah production-ready! 🎉**
