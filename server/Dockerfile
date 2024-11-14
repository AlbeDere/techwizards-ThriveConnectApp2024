# Use Node 21.1.0 as the base image
FROM node:21.1.0

# Set the working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# env
ENV PORT=3003
ENV NODE_ENV=production
ENV MONGO_DB_URL=mongodb+srv://techwizards:techwizards123@thriveconnectapp.bz3oe.mongodb.net/?retryWrites=true&w=majority&appName=ThriveConnectApp
ENV JWT_SECRET=qwertyuiopasdfghjklzxcvbnm123456
ENV GOOGLE_API_KEY=AIzaSyDNyEWlJm4SKI571n8mJlnMr_9s8VFpcY4
ENV GROQ_API_KEY=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

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 3003

# Start the application
CMD ["yarn", "start:prod"]
