<p align="center">
  <img src="../frontend/src/assets/nerdy_sessions.svg" alt="Nerdy Sessions Logo" width="200"/>
</p>

# Nerdy Sessions Backend

A Node.js backend API for **Nerdy Sessions**, built with Express, Prisma, and OpenAPI. Provides RESTful endpoints for the frontend application and manages database operations.

---

## Tech Stack

- **Node.js 20** with **Express**
- **Prisma** for database ORM
- **OpenAPI/Swagger** for API documentation
- **JWT** for authentication
- **PostgreSQL** database

---

## Features

- RESTful API endpoints
- User authentication (JWT)
- Database models for all application entities
- Interactive API documentation
- File upload handling
- Integration with external services

---

## Project Structure

```
/nerdy_sessions
│
├── frontend/                # React frontend
│
└── backend/                 # This Node.js backend
    ├── prisma/              # Database schema and migrations
    ├── __tests__/           # Test files
    ├── scripts/             # Utility scripts
    ├── index.js             # Main application entry
    ├── auth.js              # Authentication middleware
    ├── openapi.yaml         # API specification
    └── README.md
```

---

## Environment Variables

Create a `.env` file in `backend/` based on `.env.example`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/nerdy_sessions"
JWT_SECRET="your_jwt_secret_here"
PORT=5001
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Set up database (requires PostgreSQL running):

```bash
npx prisma migrate dev --name init
```

Run the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5001/api`

---

## API Documentation

Interactive API docs are available at `/docs` when the server is running.

See `openapi.yaml` for the complete API specification.

---

## Database Management

To generate Prisma client after schema changes:

```bash
npx prisma generate
```

To open Prisma Studio (database GUI):

```bash
npx prisma studio
```

---

## Testing

Run tests:

```bash
npm test
```

---

## License

ISC