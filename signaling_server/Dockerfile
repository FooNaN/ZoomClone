# Use lightweight Node.js 14 image
FROM node:14-slim

# Set directory for Docker App
WORKDIR /app

# Install dependencies
COPY package*.json ./

# Copy source code into container
COPY signaling.js ./

# Set port to 4000
EXPOSE 4000

# Run
CMD ["node", "signaling.js"]