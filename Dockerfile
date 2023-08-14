FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g npm-check-updates
RUN ncu -u
RUN npm install

COPY . .

EXPOSE 15100

CMD [ "node", "dist/main" ]
