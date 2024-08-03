FROM node:20.9-buster-slim AS base

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY . .

CMD npm run dev
