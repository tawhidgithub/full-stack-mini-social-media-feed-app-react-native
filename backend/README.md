# Mini Social Feed - Backend

A RESTful backend API for the Mini Social Feed application built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Expo Push Notifications
- Firebase Cloud Messaging (FCM V1)

---

## Features

- User Registration
- User Login (JWT Authentication)
- Password Hashing with bcrypt
- Create Posts
- Get Feed with Pagination
- Search Posts by Username
- Like / Unlike Posts
- Add Comments
- Push Notifications (Likes & Comments)
- Protected Routes

---

## Installation

### Clone the repository

```bash
git clone <your-backend-repository-url>
cd backend
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start the development server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/signup
```

Body

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Login

```
POST /api/auth/login
```

Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Returns JWT Token.

---

## Posts

### Get Posts

```
GET /api/posts
```

Supports:

```
?page=1
&limit=10
&username=john
```

---

### Create Post

```
POST /api/posts
```

Authorization

```
Bearer Token
```

Body

```json
{
  "content": "Hello World!"
}
```

---

## Like

```
POST /api/posts/:id/like
```

Authorization Required.

---

## Comments

### Get Comments

```
GET /api/posts/:id/comments
```

---

### Add Comment

```
POST /api/posts/:id/comments
```

Authorization Required.

Body

```json
{
  "text": "Nice post!"
}
```

---

## Push Notifications

The backend sends push notifications using:

- Expo Push API
- Firebase Cloud Messaging (FCM V1)

Notifications are sent when:

- Someone likes your post
- Someone comments on your post

---

## Project Structure

```
src
├── controllers
├── middleware
├── model
├── routes
├── services
├── utils
├── config
└── index.ts
```

---

## Author

Tawhidul Islam
