# Step 1: Build the app using Node.js
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Install dependencies and build the app
COPY package*.json ./
RUN npm install

# Copy all files and build the project
COPY . .
RUN npm run build

# Step 2: Use NGINX to serve the built static files
FROM nginx:alpine

# Copy the built files from builder stage to nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
