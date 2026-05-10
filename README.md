# Netflix FeatureFlow

A modern, production-ready MERN stack web application for managing feature requests with a premium Netflix-inspired UI.

## Features

- **Authentication:** Secure JWT-based login and registration. Auto-assign admin role to specific emails.
- **Role-Based Access:** Protected routes for users and an exclusive dashboard for admins.
- **Feature Requests:** Users can submit, view, and upvote feature requests.
- **Admin Panel:** Admins can manage the status of requests, provide feedback, and view platform statistics.
- **Premium UI:** Built with Tailwind CSS and Framer Motion for a sleek, responsive, dark-mode design.

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local instance or MongoDB Atlas URI)

## Installation & Local Development

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following contents:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
# or
npm start
```

### 2. Frontend Setup

Open another terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory if your backend is not running on port 5000:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite development server:
```bash
npm run dev
```

## Admin Accounts

The system automatically assigns the `admin` role to users who register with the following emails:
1. `sharanyarkv@gmail.com`
2. `e0123041@sriher.edu.in`

Register with one of these emails to access the Admin Panel.

## Render Deployment Instructions

### Deploying the Backend (Web Service)

1. Go to [Render](https://render.com/) and create a new **Web Service**.
2. Connect this GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to: `npm install`
5. Set the **Start Command** to: `npm start`
6. Add the following Environment Variables:
   - `PORT` (e.g., 5000)
   - `MONGODB_URI` (your production MongoDB Atlas URI)
   - `JWT_SECRET` (a strong random string)
   - `CLIENT_URL` (the URL of your deployed frontend, e.g., `https://your-frontend.onrender.com`)

### Deploying the Frontend (Static Site)

1. Go to Render and create a new **Static Site**.
2. Connect this GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. Set the **Build Command** to: `npm install && npm run build`
5. Set the **Publish Directory** to: `dist`
6. Add the following Environment Variable (under Advanced):
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://your-backend.onrender.com/api`)
7. **Important for React Router:** In the Render settings for your Static Site, set up a Redirect/Rewrite rule so that all routes hit `index.html`. 
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`
