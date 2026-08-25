# Base node image to run this version of the documentation site
FROM node:25

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and yarn.lock files to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the default VuePress dev server port
EXPOSE 8080

# Start the VuePress dev server
CMD ["yarn", "dev"]
