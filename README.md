# Demo Bank Application - Full-Stack Secure Banking System

The project is a secure full-stack online baking simulation, built to demonstrate key backend and frontend concepts including authentication, financial transactions, monitoring and system scalability. The application replicates essential features of modern online banking platforms and adds real-world tooling like 2FA, JWT, and performace monitoring with Grafana and Prometheus.

## Architecture overview

- Frontend: Built with Next.js, offering a modern single-page interface for users to login, manage accounts and perform transactions.
- Backend: Powered by Spring Boot, handling business login, user management, security and transactionl processing.
- APIs: RESTful API endpoints for all user interactions, secured with JWT token and protected routes.
- Authentication:

1. JWT(JSON Web Tokens) for session management.
2. Two-Factor Authentication (2FA) using Twilio to send OTP codes via SMS.

- Security:

1. Password hashed with HS512 algorithm and stored using simulated IBANs.
2. Validations ensure transaction integrity and error handling.

## UI/UX Pages Overview

### Login Page

Secure login with username, password, and two-factor authentication (2FA).
![Login](images/login_page.png)

### Dashboard page

Summary of account in short manner like balances, recent transactions and alerts in a clean, user-friendly dashboard interfact.

![Dashboard](images/dashboard.png)

### Monitoring of performance

Real-time system performance metrics visualized with Grafana, showing APIlatency currently moment only for authentication process.

![Monitoring](images/grafana-monitoring.jpg)

## Features 

- JWT Authentication + Registration & 2FA via Twilio OTP 
- IBAN-based transaction processing
- Encrypted password storage
- Protected frontend routes
- Real-time system monitoring (Grafana + Prometheus)
- User card generation service (in process)
- Notifications system for user dashboard (in process)
- RBAC for role based access (in process)


## Tech Stack 
1. Frontend: `Next.js, React, Tailwind Css, Css`
2. Backend: `Spring Boot, PostgreSQL, Twilio, Redis`
3. Monitoring and preformance test: `Prometheus, Grafana, Jmeter`
4. Security: JWT, 2FA, Bcrypt, HS512, RBAC(in process), HTTPS

## 🚀 Getting Started 

```bash
npm install
```
Command install all necessary dependencies listed in package.json.
```bash
npm run dev
```
Starts the frontend in development mode on https://localhost:3000

