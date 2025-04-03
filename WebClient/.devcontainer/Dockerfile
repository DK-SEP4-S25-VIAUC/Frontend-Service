FROM node:18

WORKDIR /workspace

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]