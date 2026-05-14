#!/bin/bash
# deploy.sh — pull latest code, rebuild, and reload the app
# Run from anywhere: bash /root/building-digital-career/deploy.sh

set -e

cd /root/building-digital-career

echo "→ Pulling latest code..."
git pull origin main

echo "→ Installing dependencies..."
npm install --production=false

echo "→ Building..."
npm run build

echo "→ Reloading app (zero-downtime)..."
pm2 reload ecosystem.config.js --update-env

echo "→ Done. Status:"
pm2 status bdc-app
