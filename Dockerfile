FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --production
CMD ["node", "src/main.js"]
EXPOSE 3000
