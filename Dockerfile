FROM node:18-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN yarn install --production

EXPOSE 3000

ENTRYPOINT node src/main.js
