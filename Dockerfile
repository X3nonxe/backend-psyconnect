FROM node:18-alpine

# Install build tools untuk native modules
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install --production
RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]