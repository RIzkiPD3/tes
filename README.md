# TodoApp API

A RESTful API for managing tasks, categories, users, and reminders built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- **User Management**: Create, read, update, and delete users
- **Category Management**: Organize tasks into categories
- **Task Management**: Create, read, update, and delete tasks with status and priority
- **Reminder System**: Set reminders for tasks
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **API Documentation**: Swagger/OpenAPI documentation
- **TypeScript**: Full TypeScript support for better development experience

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT + bcryptjs
- **Documentation**: Swagger/OpenAPI

## Project Structure

```
src/
├── config/          # Configuration files (JavaScript)
├── controllers/     # Route controllers (TypeScript)
├── middleware/      # Authentication middleware (TypeScript)
├── migrations/      # Database migrations (JavaScript)
├── models/          # Sequelize models (TypeScript)
├── routes/          # API routes (TypeScript)
├── app.ts          # Main application file
└── test-connection.ts # Database connection test
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `env.example`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=todoapp
   DB_USER=your_username
   DB_PASS=your_password
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. Set up PostgreSQL database and run migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

## Usage

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## API Endpoints

### Public Routes
- **Authentication**: `/api/auth`
  - `POST /register` - Register new user
  - `POST /login` - Login user

### Protected Routes (Require JWT Token)
- **Users**: `/api/users`
- **Categories**: `/api/categories`
- **Tasks**: `/api/tasks`
- **Reminders**: `/api/reminders`

## Authentication

### Register
```bash
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Using JWT Token
Add the JWT token to the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Documentation

Access Swagger documentation at: `http://localhost:3000/api-docs`

## Database Schema

- **users**: id, name, email, password, created_at, updated_at
- **categories**: id, name, description, user_id, created_at, updated_at
- **tasks**: id, title, description, status, priority, due_date, user_id, category_id, created_at, updated_at
- **reminders**: id, title, message, reminder_time, is_sent, user_id, task_id, created_at, updated_at

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Route Protection**: Middleware to protect sensitive endpoints
- **User Isolation**: Users can only access their own data

## Notes

- Migration and config files remain in JavaScript for Sequelize compatibility
- Models, controllers, and routes are converted to TypeScript
- The project maintains the same functionality while adding type safety and authentication
- All CRUD operations (except auth) require valid JWT token
