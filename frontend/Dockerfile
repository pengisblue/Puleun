# Base image
FROM node:20.10.0-alpine As build

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx-alpine

COPY --from=build /frontend/build /usr/share/nginx/html