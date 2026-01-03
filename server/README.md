# BMHC Performance Management System - Backend API

RESTful API for the Black Men's Health Clinic Performance Management System.

## Features

- **JWT Authentication** - Secure user authentication with role-based access
- **PostgreSQL Database** - Robust data storage with proper relationships
- **File Processing** - PDF/DOCX contract document parsing
- **PDF Generation** - Automated performance review PDFs
- **REST API** - Clean, RESTful endpoints for all operations

## Tech Stack

- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JSON Web Tokens** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File uploads
- **pdf-parse** - PDF parsing
- **mammoth** - DOCX parsing
- **pdfkit** - PDF generation

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=bmhc_performance
# DB_USER=postgres
# DB_PASSWORD=your_password
# JWT_SECRET=your_secret_key

# Initialize database
npm run db:init

# Start development server
npm run dev
```

## Database Setup

The system requires PostgreSQL. Create a database:

```sql
CREATE DATABASE bmhc_performance;
```

Then run the initialization script:

```bash
npm run db:init
```

This will:
- Create all tables
- Set up indexes and triggers
- Create default admin user (email: admin@bmhc.org, password: admin123)

## API Endpoints

### Authentication

```
POST /api/auth/register - Register new user
POST /api/auth/login - Login
GET  /api/auth/me - Get current user
```

### Contractors

```
GET    /api/contractors - Get all contractors
GET    /api/contractors/:id - Get contractor by ID
POST   /api/contractors - Create contractor (admin/supervisor)
PUT    /api/contractors/:id - Update contractor (admin/supervisor)
DELETE /api/contractors/:id - Delete contractor (admin)
```

### KPIs

```
GET    /api/kpis/contractor/:contractorId - Get KPIs for contractor
POST   /api/kpis - Create KPI (admin/supervisor)
PUT    /api/kpis/:id - Update KPI (admin/supervisor)
DELETE /api/kpis/:id - Delete KPI (admin)
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## User Roles

- **admin** - Full access to all operations
- **supervisor** - Can manage contractors and KPIs
- **contractor** - Read-only access to own data

## Development

```bash
# Start with auto-reload
npm run dev

# Production
npm start
```

## Environment Variables

See `.env.example` for all required environment variables.

## Database Schema

- **users** - User accounts with authentication
- **contractors** - Contractor profiles
- **obligations** - Contract obligations
- **kpis** - Key Performance Indicators
- **reviews** - Performance reviews
- **review_sections** - Review-KPI relationships
- **contract_documents** - Uploaded contracts

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Role-based authorization
- SQL injection protection via parameterized queries
- Input validation with express-validator

## License

Internal use only - Black Men's Health Clinic
