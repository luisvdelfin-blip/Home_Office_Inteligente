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

# Copy environment template
COPY .env.example ./.env.example

# Create a simple nginx-like static file server using Express
RUN echo 'import express from "express";\nimport path from "path";\nimport { fileURLToPath } from "url";\nimport apiApp from "./server/index.js";\n\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);\n\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\n// API routes\napp.use("/api", apiApp);\n\n// Serve static files\napp.use(express.static(path.join(__dirname, "dist")));\n\n// Handle SPA routing\napp.get("*", (req, res) => {\n  res.sendFile(path.join(__dirname, "dist", "index.html"));\n});\n\napp.listen(PORT, "0.0.0.0", () => {\n  console.log(`🚀 Full-stack app running on port ${PORT}`);\n});' > app.js

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the full-stack application
CMD ["node", "app.js"]