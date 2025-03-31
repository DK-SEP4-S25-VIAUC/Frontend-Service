FROM node:20

WORKDIR /workspaces/Frontend-Service/WebClient

COPY WebClient/package*.json ./

RUN npm install

COPY WebClient/ .

EXPOSE 3000

CMD ["npm", "start"]