FROM node:14
WORKDIR /fec
ENV EC2_IP=52.53.221.54
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "server/start.js" ]
