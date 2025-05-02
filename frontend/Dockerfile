FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies at once
RUN npm install --legacy-peer-deps
RUN npm install --legacy-peer-deps react-chartjs-2 chart.js

# Copy app source
COPY . .

# Copy certs if needed by server.js
COPY ./certificates /app/certificates
COPY ./server.crt /app/server.crt
COPY ./server.key /app/server.key

# Build the Next.js app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Environment
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]

