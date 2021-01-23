FROM node:14
WORKDIR /fec
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server/start.js" ]