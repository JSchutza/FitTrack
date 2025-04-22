# FitTrack - Project Summary

This document provides an overview of the FitTrack fitness tracking application structure and components.

## Overview

FitTrack is a full-stack fitness tracking application that allows users to log workouts, view stats, set goals, and track their fitness journey.

## Backend Structure

### Server Configuration
- Express server with middleware setup
- MongoDB connection
- JWT-based authentication
- RESTful API design

### Models
- **User Model**: Authentication and profile data
- **Workout Model**: Exercise logging with type, duration, etc.
- **Goal Model**: Weekly fitness goals and targets

### Controllers
- **Auth Controller**: Handles user registration, login, and profile
- **Workout Controller**: CRUD operations for workout data + statistics
- **Goal Controller**: Goal setting and progress tracking

### Middleware
- **Auth Middleware**: Protects routes that require authentication

## Frontend Structure

### Authentication
- Login and registration forms
- JWT storage in localStorage
- Protected routes

### Components
- **Navigation**: Responsive navbar with mobile support
- **Dashboard**:
  - Summary cards for workout stats
  - Charts for visualizing workout data
  - Recent workouts table
- **Goals**:
  - Goal setting form
  - Progress tracking with visual indicators

### Pages
- **Home**: Landing page with features overview
- **Dashboard**: Data visualization and workout summaries
- **Goals**: Goal setting and progress tracking

## Key Features Implemented

1. **User Authentication**
   - Registration with validation
   - Secure login
   - Protected routes

2. **Dashboard Visualization**
   - Weekly activity chart
   - Workout type breakdown
   - Summary statistics

3. **Workout Management**
   - View recent workouts
   - Add, edit, and delete workouts
   - Track different workout types

4. **Goal Setting**
   - Set weekly workout targets
   - Set weekly minutes targets
   - Optional weight goal
   - Visual progress indicators

5. **Responsive Design**
   - Mobile-first approach
   - Responsive layout for all screen sizes

## Technical Implementation

- **State Management**: React hooks for local state
- **Styling**: Tailwind CSS for modern UI
- **Data Visualization**: Recharts for graphs and charts
- **API Communication**: Axios for API requests
- **Routing**: React Router for navigation
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT for secure authentication
- **Error Handling**: Comprehensive error handling on both frontend and backend

## Running the Project
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

## Next Steps
- Deploy to production (Vercel, Render/Fly.io)
- Implement unit and integration tests
- Add additional features like social sharing and reminder notifications 