# BDA LeadFlow CRM

A full-stack MERN CRM application developed for managing business development workflows in a manufacturing company. The system helps Business Development Associates (BDA) manage lead pipelines, client interactions, follow-ups, and sales tracking efficiently.

---

# Live Demo

Frontend:
https://bda-leadflow.vercel.app

Backend API:
https://bda-crm.onrender.com

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout Functionality

## Lead Management
- Add New Leads
- View Leads
- Edit Leads
- Delete Leads
- Search Leads
- Lead Status Tracking

## Dashboard Analytics
- Total Leads
- Converted Leads
- Interested Leads
- Contacted Leads
- Visual Analytics & Charts

## Follow-Up System
- Add Follow-Ups
- Track Client Communication
- Manage Workflow

## UI Features
- Responsive Design
- Navbar Navigation
- Protected Layout
- Modern Tailwind CSS Interface

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Recharts

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# Project Structure

## Client


client/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
├── public/
├── package.json
└── vercel.json

## Server

server/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── index.js
└── package.json

## Installation & Setup

Clone Repository

git clone https://github.com/YOUR_USERNAME/bda-crm.git

## Frontend Setup

cd client
npm install
npm run dev
http://localhost:5173

## Backend Setup

cd server
npm install
npm run dev
http://localhost:5000

## Environment Variables

Create a .env file inside the server folder.

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

## Deployment

Frontend Deployment
  Hosted on Vercel

Backend Deployment
  Hosted on Render
Database
  MongoDB Atlas Cloud Database

  ## Future Improvements
Role-Based Access Control
Lead Assignment System
Email Notifications
Export Reports (Excel/PDF)
Dark Mode
Activity Timeline
Real-Time Notifications
Advanced Analytics

## Author

Samal 

## License

This project is developed for educational and internship purposes.
