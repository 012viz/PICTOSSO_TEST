# Use the official Node.js 20 image.
FROM node:21-bullseye

# Create and change to the app directory.
WORKDIR /usr/src/app

RUN apt-get update
RUN apt install -y fonts-roboto
RUN apt install -y librsvg2-bin

# Install custom fonts
RUN mkdir -p /usr/share/fonts/gilroy
COPY public/fonts/gilroy/* /usr/share/fonts/gilroy

RUN fc-cache -f -v

# Copy package.json, package-lock.json and other necessary files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of your application code
COPY . .

ARG NEXT_PUBLIC_STRIPE_SECRET_WEBHOOK_KEY
ENV NEXT_PUBLIC_STRIPE_SECRET_WEBHOOK_KEY=$NEXT_PUBLIC_STRIPE_SECRET_WEBHOOK_KEY

ARG NEXT_PUBLIC_STRIPE_SECRET_KEY
ENV NEXT_PUBLIC_STRIPE_SECRET_KEY=$NEXT_PUBLIC_STRIPE_SECRET_KEY

# Build your Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]