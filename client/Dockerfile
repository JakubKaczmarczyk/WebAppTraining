# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install mkcert and OpenSSL for SSL certificate generation
RUN apt-get update && apt-get install -y curl libnss3-tools openssl && \
    curl -JLO https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64 && \
    chmod +x mkcert-v1.4.4-linux-amd64 && mv mkcert-v1.4.4-linux-amd64 /usr/local/bin/mkcert && \
    mkcert -install

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate SSL certificates
RUN mkdir -p /app/ssl && \
    mkcert -key-file /app/ssl/localhost-key.pem -cert-file /app/ssl/localhost.pem localhost

# Expose the port Angular serves on
EXPOSE 4200

# Command to serve the Angular app
CMD ["npm", "start"]
