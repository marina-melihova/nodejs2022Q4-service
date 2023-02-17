FROM node:alpine3.16

WORKDIR /home/app

COPY package*.json ./

RUN npm ci && npm cache clean --force
