<p align="center">
  <img src="src/assets/nerdy_sessions.svg" alt="Nerdy Sessions Logo" width="200"/>
</p>

# Nerdy Sessions Frontend

A modern, responsive frontend for the **Nerdy Sessions** platform, built with React, TypeScript, Vite, and TailwindCSS. This interface allows users to interact with various dashboards, manage configurations, and access powerful tools within the Nerdy Sessions ecosystem.

## Project Structure

```
/nerdy_sessions
│
├── backend
│   ├── index.js            # Express API server
│   ├── prisma/
│   │   └── schema.prisma   # Prisma schema (includes mockup_websites model)
│   └── uploads/            # Uploaded mockup images
│
├── frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── MockupGallery.tsx    # Existing image gallery
│   │   │   ├── MockupWebsites.tsx   # New website URLs feature
│   │   │   └── ...
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── README.md
│
├── README.md               # Project documentation
└── ...
```

This structure includes the new **Mockup Websites** feature with backend API, database model, and frontend component.

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast development and build tooling
- **TailwindCSS** for utility-first styling
- **ESLint** for code quality and consistency

## Features

- Multiple interactive dashboards (Agents, Tools, Workflows, News, Stock, Life)
- User authentication (Sign In / Sign Up)
- Configurable sidebar navigation
- Responsive design optimized for all devices
- Integration-ready with backend APIs

### Mockup Websites Feature

- Add website URLs with descriptions
- View all saved websites in a table
- Click description to open website in a new tab
- Edit or delete existing website entries
- Data stored in the backend database

## Available Routes

- `/` — Main dashboard page
- `/signin` — User login page
- `/signup` — User registration page

## Backend API

The backend exposes REST API endpoints for managing mockup websites:

- `GET /api/mockup-websites` — List all saved websites
- `POST /api/mockup-websites` — Add a new website (JSON body: `{ "url": "...", "description": "..." }`)
- `PUT /api/mockup-websites/:id` — Update an existing website
- `DELETE /api/mockup-websites/:id` — Delete a website

## Database

- Prisma ORM with PostgreSQL
- New model: `mockup_websites` with fields `id`, `url`, `description`, `created_at`, `uploaded_by`
- Migration applied via `prisma db push`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
