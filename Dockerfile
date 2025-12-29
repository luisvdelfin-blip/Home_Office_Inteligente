# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the frontend application
RUN npm run build

# Verify build output exists and contains expected files
RUN ls -la dist/ && \
    test -f dist/index.html && \
    test -d dist/assets && \
    echo "Build verification successful" || (echo "Build verification failed" && exit 1)

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files for production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built frontend assets
COPY --from=builder /app/dist ./dist

# Copy server files
COPY server ./server

# Create data directory for SQLite database
RUN mkdir -p ./data

# Copy environment template
COPY .env.example ./.env.example

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the full-stack application
CMD ["npm", "start"]