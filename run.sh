#!/bin/bash

echo "🚀 Starting FitTrack Application..."

# Check if tmux is installed
if ! command -v tmux &> /dev/null; then
    echo "⚠️ tmux is not installed. Starting services in separate terminals."
    echo "Please run each script in separate terminals:"
    echo "  - Terminal 1: cd backend && ./run.sh"
    echo "  - Terminal 2: cd frontend && ./run.sh"
    exit 1
fi

# Make scripts executable if they aren't already
chmod +x backend/run.sh frontend/run.sh

# Start services using tmux
echo "📱 Starting backend and frontend services..."

# Create a new tmux session
tmux new-session -d -s fittrack

# Split the window horizontally
tmux split-window -h -t fittrack

# Run backend in the left pane
tmux send-keys -t fittrack:0.0 "cd backend && ./run.sh" C-m

# Run frontend in the right pane
tmux send-keys -t fittrack:0.1 "cd frontend && ./run.sh" C-m

# Attach to the tmux session
tmux attach-session -t fittrack

echo "✅ FitTrack Application stopped." 