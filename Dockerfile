FROM node:14
WORKDIR /fec
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "server/start.js" ]
