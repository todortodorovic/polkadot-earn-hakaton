# Quick Start Guide

Get the Polkadot Grants Backend API up and running in 5 minutes.

## Prerequisites

- Node.js v16 or higher
- npm or yarn
- A terminal/command prompt

## 1. Installation

Navigate to the backend directory and install dependencies:

```bash
cd /path/to/polkadot-earn-hakaton/backend
npm install
```

## 2. Environment Setup

Create a `.env` file in the backend root directory:

```bash
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secure-jwt-secret-key-change-this"
PORT=4000
CORS_ORIGIN="http://localhost:3000"
```

**Important:** Change the `JWT_SECRET` to a secure random string in production!

## 3. Database Initialization

Initialize the database with migrations and seed data:

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations to create database schema
npm run db:migrate

# Seed database with test data and grants
npm run db:seed
```

This will create:
- SQLite database at `prisma/dev.db`
- Admin user: `admin@polkadot-grants.com` / `admin123`
- Test user: `user@example.com` / `user123`
- 8 grant programs with different categories

## 4. Start the Server

```bash
npm run dev
```

The API will start at `http://localhost:4000`

You should see:
```
Server is running on http://localhost:4000
API available at http://localhost:4000/api
```

## 5. Test the API

### Test Health Endpoint

```bash
curl http://localhost:4000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Polkadot Grants API is running"
}
```

### Login as Admin

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@polkadot-grants.com",
    "password": "admin123"
  }'
```

Save the token from the response - you'll need it for authenticated requests!

### Get All Grants

```bash
curl http://localhost:4000/api/grants
```

You should see 8 grants across different categories.

## Available Test Accounts

### Admin Account
- **Email:** admin@polkadot-grants.com
- **Password:** admin123
- **Access:** Full admin dashboard and application management

### Test User Account
- **Email:** user@example.com
- **Password:** user123
- **Access:** Can apply for grants and view own applications

## Quick API Reference

### Authentication

**Register:**
```bash
POST /api/auth/register
{
  "email": "your@email.com",
  "password": "yourpassword",
  "name": "Your Name"
}
```

**Login:**
```bash
POST /api/auth/login
{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

**Get Current User:**
```bash
GET /api/auth/me
Authorization: Bearer <your-token>
```

### Grants

**Get All Grants:**
```bash
GET /api/grants
GET /api/grants?category=Infrastructure
GET /api/grants?active=true
```

**Get Grant by ID:**
```bash
GET /api/grants/:id
```

### Applications (Requires Authentication)

**Create Application:**
```bash
POST /api/applications
Authorization: Bearer <your-token>
{
  "grantId": "infrastructure-grant",
  "projectTitle": "My Amazing Project",
  "projectDescription": "Detailed description...",
  "requestedAmount": 50000,
  "walletAddress": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
}
```

**Get My Applications:**
```bash
GET /api/applications
Authorization: Bearer <your-token>
```

**Get Application by ID:**
```bash
GET /api/applications/:id
Authorization: Bearer <your-token>
```

### Admin Endpoints (Requires Admin Token)

**Get All Applications:**
```bash
GET /api/admin/applications
GET /api/admin/applications?status=pending
Authorization: Bearer <admin-token>
```

**Approve Application:**
```bash
POST /api/admin/applications/:id/approve
Authorization: Bearer <admin-token>
{
  "adminNotes": "Approved - great proposal!"
}
```

**Reject Application:**
```bash
POST /api/admin/applications/:id/reject
Authorization: Bearer <admin-token>
{
  "adminNotes": "Needs more details"
}
```

## Grant Categories & Amounts

| Category | Amount | Grant ID |
|----------|--------|----------|
| Infrastructure | $50,000 | `infrastructure-grant` |
| Development | $30,000 | `dapp-development-grant` |
| Research | $25,000 | `research-grant` |
| Community | $15,000 | `community-&-education-grant` |
| Security | $40,000 | `security-&-auditing-grant` |
| Design | $20,000 | `ux/ui-design-grant` |
| Integration | $60,000 | `cross-chain-integration-grant` |
| Tooling | $35,000 | `developer-tools-grant` |

## Common Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# View database in Prisma Studio
npm run db:studio

# Reset database (WARNING: Deletes all data)
npm run db:reset

# Re-seed database
npm run db:seed

# Run migrations
npm run db:migrate
```

## Typical Workflow Example

### As a User:

1. Register a new account:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "password": "securepass123",
    "name": "Jane Developer",
    "walletAddress": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
  }'
```

2. Browse available grants:
```bash
curl http://localhost:4000/api/grants
```

3. Submit an application (use your token from registration):
```bash
curl -X POST http://localhost:4000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "grantId": "infrastructure-grant",
    "projectTitle": "Polkadot Block Explorer",
    "projectDescription": "A modern block explorer for Polkadot with real-time analytics",
    "teamInfo": "Team of 3 experienced blockchain developers",
    "milestones": [
      {
        "title": "Phase 1: Core Development",
        "duration": "3 months",
        "amount": 25000,
        "deliverables": ["Basic explorer", "Transaction search", "Block details"]
      },
      {
        "title": "Phase 2: Advanced Features",
        "duration": "2 months",
        "amount": 25000,
        "deliverables": ["Analytics dashboard", "API", "Documentation"]
      }
    ],
    "requestedAmount": 50000,
    "walletAddress": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
  }'
```

4. Check your applications:
```bash
curl http://localhost:4000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### As an Admin:

1. Login as admin:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@polkadot-grants.com",
    "password": "admin123"
  }'
```

2. View all pending applications:
```bash
curl http://localhost:4000/api/admin/applications?status=pending \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

3. Approve an application:
```bash
curl -X POST http://localhost:4000/api/admin/applications/APPLICATION_ID/approve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "adminNotes": "Excellent proposal with clear milestones and experienced team. Approved for full funding."
  }'
```

## Using Prisma Studio

Prisma Studio provides a visual database browser:

```bash
npm run db:studio
```

This will open `http://localhost:5555` where you can:
- View all database tables
- Edit records directly
- Browse relationships
- Test queries

## Troubleshooting

### Port Already in Use

If port 4000 is already in use, change it in `.env`:
```
PORT=4001
```

### Database Issues

Reset the database:
```bash
npm run db:reset
npm run db:seed
```

### Migration Errors

If you get migration errors:
```bash
rm -rf prisma/migrations
rm prisma/dev.db
npm run db:migrate
npm run db:seed
```

### Token Errors

If you get "Invalid or expired token":
- Token might be expired (7 days validity)
- Login again to get a fresh token
- Make sure you're including `Bearer` prefix in Authorization header

## Next Steps

- Read the full [README.md](./README.md) for detailed information
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference
- Explore the code in `src/` directory
- Customize grants in `prisma/seed.ts`
- Modify database schema in `prisma/schema.prisma`

## Production Deployment Checklist

Before deploying to production:

1. Change JWT_SECRET to a secure random string
2. Update CORS_ORIGIN to your frontend domain
3. Set up proper environment variables
4. Use a production database (PostgreSQL recommended)
5. Enable HTTPS
6. Set up proper logging
7. Configure rate limiting
8. Set up monitoring and alerts
9. Review security settings
10. Create database backups

## Getting Help

- Review error messages in the terminal
- Check the logs for detailed information
- Ensure all environment variables are set correctly
- Verify Node.js version (v16+)
- Make sure dependencies are installed

## Summary

You now have a fully functional Polkadot Grants API running locally with:
- User authentication and authorization
- 8 pre-configured grant programs
- Application submission workflow
- Admin approval system
- Test accounts ready to use

Happy coding!
