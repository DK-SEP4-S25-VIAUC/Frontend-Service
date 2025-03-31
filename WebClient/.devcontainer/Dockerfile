
# Use Node 20 as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# We'll mount the source code, so we don't need to copy it
# But we need to ensure the node_modules directory is preserved
RUN mkdir -p /node_modules
RUN cp -R node_modules/. /node_modules/
RUN rm -rf node_modules
RUN ln -s /node_modules node_modules

# Expose the port that Vite runs on
EXPOSE 5173

# Command to run the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]