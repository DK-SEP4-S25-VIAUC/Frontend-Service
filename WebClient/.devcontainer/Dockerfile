
# Use Node 20 as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy the entire project
COPY . .

# Install dependencies
RUN npm install

# Expose the port that Vite runs on
EXPOSE 5173

# Command to run the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]