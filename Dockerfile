FROM node:alpine3.16

RUN mkdir /home/app

WORKDIR /home/app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

CMD npm run start:dev > /home/app/logs/app.log