#!/bin/bash

echo "🚀 Starting FitTrack Frontend..."

# Install dependencies if they don't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Dependencies not found. Installing..."
  npm install
else
  echo "✅ Dependencies already installed."
fi

# Fix the Tailwind CSS and PostCSS configuration
echo "📦 Installing correct Tailwind CSS packages..."
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@3.4.0 postcss autoprefixer

# Initialize Tailwind CSS
echo "🔧 Initializing Tailwind CSS..."
# Create tailwind.config.js
echo "/** @type {import('tailwindcss').Config} */
export default {
  content: [
    \"./index.html\",
    \"./src/**/*.{js,ts,jsx,tsx}\",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}" > tailwind.config.js

# Create updated postcss.config.js
echo "/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}" > postcss.config.js

# Check and fix index.css file
echo "Checking index.css..."
if [ -f "src/index.css" ]; then
  echo "Verifying CSS imports in index.css..."
  # Check if the file contains tailwind directives
  if ! grep -q "@tailwind" "src/index.css"; then
    echo "⚠️ Tailwind directives not found in index.css. Updating..."
    # Backup the original file
    cp src/index.css src/index.css.bak
    # Create a new file with the required directives
    echo '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply text-secondary-900;
  }
  
  body {
    @apply bg-secondary-50 min-h-screen;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50;
  }
  
  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }
  
  .btn-secondary {
    @apply bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-300;
  }
  
  .btn-accent {
    @apply bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-400;
  }
  
  .input {
    @apply w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
  }
  
  .label {
    @apply block text-sm font-medium text-secondary-700 mb-1;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}' > src/index.css
  else
    echo "✅ Tailwind directives found in index.css."
  fi
else
  echo "⚠️ index.css not found. Creating..."
  echo '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply text-secondary-900;
  }
  
  body {
    @apply bg-secondary-50 min-h-screen;
  }
}

@layer components {
  .btn {
    @apply px-4 py-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50;
  }
  
  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }
  
  .btn-secondary {
    @apply bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-300;
  }
  
  .btn-accent {
    @apply bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-400;
  }
  
  .input {
    @apply w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
  }
  
  .label {
    @apply block text-sm font-medium text-secondary-700 mb-1;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}' > src/index.css
fi

# Ensure CSS is imported in main.jsx
echo "Checking CSS import in main.jsx..."
if [ -f "src/main.jsx" ]; then
  if ! grep -q "import './index.css'" "src/main.jsx"; then
    echo "⚠️ CSS import not found in main.jsx. Updating..."
    # Backup the original file
    cp src/main.jsx src/main.jsx.bak
    # Add import at the top preserving other content
    sed -i '1s/^/import ".\/index.css";\n/' src/main.jsx
  else
    echo "✅ CSS import found in main.jsx."
  fi
else
  echo "⚠️ main.jsx not found. Please check your project structure."
fi

# Create or update vite.config.js to make sure it has correct plugins
echo "Updating vite.config.js..."
echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    hmr: {
      overlay: true
    }
  }
})" > vite.config.js

# Ensure recharts is installed
echo "📊 Installing Recharts for data visualization..."
npm install recharts

# Start the frontend development server
echo "🔥 Starting development server..."
npm run dev 