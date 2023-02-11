FROM node:alpine3.16

WORKDIR /usr/app
COPY package.json package-lock.json ./

# RUN apt-get update
RUN npm ci && npm cache clean --force

#COPY . /app
# -or-
COPY . .

CMD ["npm", "run", "start:dev"]