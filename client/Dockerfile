# Use lightweight Node.js 14 image
FROM node:14-slim

# Set directory for Docker App
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm i

# Copy source code into container
COPY . .

# Set port to 3000
EXPOSE 3000

# Run
CMD ["npm", "start"]