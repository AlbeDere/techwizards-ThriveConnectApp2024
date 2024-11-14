# Use Node 21.1.0 as the base image
FROM node:21.1.0

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 3003

# Start the application
CMD ["yarn", "start:prod"]
