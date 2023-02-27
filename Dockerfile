FROM node:alpine3.16

WORKDIR /home/app

COPY package*.json tsconfig.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN mkdir /home/app/logs

CMD npm run start:dev
