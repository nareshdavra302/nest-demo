FROM node:10.16.3-alpine

RUN apk add g++ make python --no-cache

WORKDIR /usr/src/app

COPY package*.json ./

RUN  yarn 

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:prod" ]