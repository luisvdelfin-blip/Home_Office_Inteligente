# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Verify build output exists and contains expected files
RUN ls -la dist/ && \
    test -f dist/index.html && \
    test -d dist/assets && \
    echo "Build verification successful" || (echo "Build verification failed" && exit 1)

# Check that index.html contains actual script tags, not source references
RUN grep -q "assets/" dist/index.html && echo "HTML contains built assets" || (echo "HTML still contains source references" && cat dist/index.html && exit 1)

# Production stage
FROM nginx:alpine AS production

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Verify files are copied correctly
RUN ls -la /usr/share/nginx/html/ && \
    test -f /usr/share/nginx/html/index.html && \
    echo "Production files verified"

# Expose port 3000 for Coolify
EXPOSE 3000

# Health check on port 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start nginx on port 3000
CMD ["nginx", "-g", "daemon off;"]