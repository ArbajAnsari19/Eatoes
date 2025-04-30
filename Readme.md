# Eatoes - Food Ordering System

A full-stack food ordering application built with React, TypeScript, Node.js, and MongoDB.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Frontend Routes](#frontend-routes)
- [Environment Variables](#environment-variables)

## Overview

Eatoes is a food ordering system that allows users to browse menus, add items to cart, place orders, and view order history. The application features user authentication, real-time cart management, and order tracking.

## Features

- 🔐 User Authentication (Signup/Login)
- 🍽️ Menu Item Browsing
- 🛒 Cart Management
- 📱 Phone Number Based Order History
- 💳 Order Placement
- 🎨 Responsive Design

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- TanStack Query for data fetching
- Context API for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
eatoes/
├── Eatoes_frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
└── Eatoes_backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── app.ts
    └── package.json
```

## Getting Started

### Backend Setup

1. Navigate to backend directory:
```bash
cd Eatoes_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Seed the database with menu items:
```bash
npm run seed:menu
```

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd Eatoes_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Documentation

### Authentication Endpoints

#### `POST /api/auth/signup`
- Creates a new user account
- Body: `{ name: string, email: string, password: string }`
- Returns: `{ message: string }`

#### `POST /api/auth/login`
- Authenticates a user
- Body: `{ email: string, password: string }`
- Returns: `{ token: string }`

### Menu Endpoints

#### `GET /api/menu`
- Retrieves all menu items
- Authentication: Not required
- Returns: Array of menu items

### Order Endpoints

#### `POST /api/order`
- Places a new order
- Authentication: Required
- Body:
```json
{
  "items": [{ "menuItemId": string, "quantity": number }],
  "phoneNumber": string,
  "totalPrice": number
}
```
- Returns: `{ message: string }`

#### `GET /api/order/:phoneNumber`
- Retrieves order history by phone number
- Authentication: Not required
- Returns: Array of orders

## Frontend Routes

- `/` - Redirects to menu page
- `/login` - User login page
- `/signup` - User registration page
- `/menu` - Menu items display (protected)
- `/cart` - Shopping cart (protected)
- `/order-success` - Order confirmation page (protected)
- `/order-history` - Order history page

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (vite.config.ts)
```typescript
server: {
  host: "::",
  port: 8080
}
```

## Data Models

### User
```typescript
{
  name: string;
  email: string;
  password: string;
}
```

### MenuItem
```typescript
{
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}
```

### Order
```typescript
{
  phoneNumber: string;
  items: Array<{
    menuItemId: ObjectId;
    quantity: number;
  }>;
  totalPrice: number;
  createdAt: Date;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.