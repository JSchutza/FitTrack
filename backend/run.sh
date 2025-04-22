#!/bin/bash

echo "🚀 Starting FitTrack Backend..."

# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
  echo "📦 Dependencies not found. Installing..."
  npm install
else
  echo "✅ Dependencies already installed."
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo "⚠️ .env file not found. Creating default .env file..."
  echo "PORT=5000
MONGO_URI=mongodb://localhost:27017/fittrack
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development" > .env
  echo "⚠️ Please update the .env file with your actual MongoDB connection string and JWT secret."
fi

# Start the backend server
echo "🔥 Starting server..."
npm run dev 