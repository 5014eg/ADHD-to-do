# Use a lightweight Node.js image based on Alpine Linux
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
# We use 'npm install' here. In a real CI/CD pipeline, you might use 'npm ci'.
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
# We'll use 'npm start' which will run webpack serve
CMD ["npm", "start"]
