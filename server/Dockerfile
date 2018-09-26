FROM node:10-alpine

WORKDIR /server

EXPOSE 4000

COPY . .

RUN yarn
RUN yarn build
