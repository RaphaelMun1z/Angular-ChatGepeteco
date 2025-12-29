# Build do Angular
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Nginx
FROM nginx:alpine
COPY --from=build /app/dist/browser /usr/share/nginx/html
EXPOSE 80