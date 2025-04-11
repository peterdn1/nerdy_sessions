<p align="center">
  <img src="frontend/src/assets/nerdy_sessions.svg" alt="Nerdy Sessions Logo" width="200"/>
</p>

# Fullstack Application

A modern fullstack application with a React frontend and Node.js backend.

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling and development server
- TailwindCSS for styling
- ESLint for code quality

### Backend
- Node.js with Express
- PostgreSQL database
- Prisma ORM for database access and migrations
- CORS enabled
- Environment variables support with dotenv

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- PostgreSQL

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/peterdn1/nerdy_sessions.git
cd nerdy_sessions
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```bash
# In the backend directory, create a .env file with:
PORT=5001
DATABASE_URL=postgresql://username:password@localhost:5432/nerdy_sessions

# Additional environment variables as needed
```

4. Generate Prisma client

```bash
# From the backend directory
npx prisma generate
```

5. Run database migrations (optional, if you have migrations set up)

```bash
# From the backend directory
npx prisma migrate dev --name init
```

4. Start the development servers

Backend:
```bash
cd backend
npm run dev  # Starts with nodemon for development
# or
npm start    # Starts without auto-reload
```

Frontend:
```bash
cd frontend
npm run dev  # Starts Vite dev server
```

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Backend

- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (auto-reload)
- `npm test` - Run tests (not configured yet)

### Prisma & Database

- `npx prisma generate` - Generate Prisma client from schema
- `npx prisma migrate dev --name <name>` - Run development migration
- `npx prisma studio` - Open Prisma Studio to view and edit data
- `npx prisma db push` - Push schema changes to database without migration

## Project Structure

```
/
├── frontend/                # Frontend React application
│   ├── src/                # Source files
│   │   ├── assets/        # Static assets
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Application entry point
│   ├── public/            # Public static files
│   └── package.json       # Frontend dependencies and scripts
│
└── backend/               # Backend Node.js application
    ├── index.js          # Server entry point
    └── package.json      # Backend dependencies and scripts
```

## Development

- Frontend runs on `http://localhost:5173` by default (Vite)
- Backend runs on `http://localhost:5001` by default
- API endpoints are prefixed with `/api`
- CORS is enabled for development

## API Documentation

- **Swagger UI** is available at: [http://localhost:5001/docs](http://localhost:5001/docs)
- The OpenAPI 3.1.1 specification file is located at: `backend/openapi.yaml`
- The backend uses `swagger-ui-express` and `js-yaml` to serve the interactive API docs

This allows you to explore and test all API endpoints directly from your browser.
## ESLint Configuration

The frontend includes a robust ESLint configuration for TypeScript and React. To enable type-aware lint rules, update the configuration as shown in the frontend's eslint.config.js file.

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

ISC

## Screenshot

![Screenshot](frontend/src/assets/images/Screenshot.png)

![Sign In](frontend/src/assets/images/SignIn.png)

![App](frontend/src/assets/images/App.png)

