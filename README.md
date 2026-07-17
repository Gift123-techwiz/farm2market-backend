# Farm2Market Backend

Farm2Market is a backend API for a digital agricultural marketplace that connects farmers, buyers, cold room providers, and logistics partners.

This branch contains the Authentication, Wallet, Payments, Refunds, and Admin modules.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- TypeORM (EntitySchema)
- JWT Authentication
- Bcrypt
- Nodemailer
- Paystack API
- Axios

---

## Features Implemented

### Authentication

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization
- Email Verification
- Resend Verification Email
- Forgot Password
- Reset Password

---

### User

- View Profile
- Update Profile
- Get User by ID

---

### Wallet

- Automatic wallet creation on registration
- Get wallet
- Fund wallet (temporary testing endpoint)
- Withdraw from wallet
- Wallet transaction history

---

### Payments

- Initialize Paystack payment
- Verify Paystack payment
- Payment history

---

### Refunds

- Request refund
- Admin refund approval
- Automatic wallet credit after refund approval

---

### Admin

- Dashboard
- Get all users
- Activate/Deactivate users

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/auth/register |
| POST | /api/v1/auth/login |
| POST | /api/v1/auth/verify-email |
| POST | /api/v1/auth/resend-verification |
| POST | /api/v1/auth/forgot-password |
| PUT | /api/v1/auth/reset-password |

### Users

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/users/profile |
| PUT | /api/v1/users/profile |
| GET | /api/v1/users/:id |

### Wallet

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/wallet |
| POST | /api/v1/wallet/fund |
| POST | /api/v1/wallet/withdraw |
| GET | /api/v1/wallet/transactions |

### Payments

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/payments/initialize |
| POST | /api/v1/payments/verify |
| GET | /api/v1/payments/history |
| POST | /api/v1/payments/refund |

### Admin

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/admin/dashboard |
| GET | /api/v1/admin/users |
| PATCH | /api/v1/admin/users/:id/status |
| PATCH | /api/v1/admin/refunds/:id |

---

## Environment Variables

Create a `.env` file with the following:

```env
PORT=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

JWT_SECRET=
JWT_EXPIRES_IN=1h

PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=
```

---

## Installation

```bash
git clone <repository-url>

cd farm2market-backend

npm install

npm run dev
```

---

## Testing

The APIs were tested using:

- Thunder Client
- Paystack Sandbox
- pgAdmin

---

## Notes

- Wallets are automatically created when a user registers.
- Wallet funding endpoint is currently used for development/testing.
- In production, wallet funding should only occur after successful Paystack payment verification.
- Refund requests require admin approval before the wallet is credited.
- Passwords are securely hashed using bcrypt.
- Authentication is implemented using JWT.