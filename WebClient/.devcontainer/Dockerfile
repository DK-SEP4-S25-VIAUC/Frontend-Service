FROM node:20

WORKDIR /usr/src/app

COPY WebClient/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]