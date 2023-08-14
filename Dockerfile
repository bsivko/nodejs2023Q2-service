FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g npm-check-updates
RUN ncu -u
RUN npm install && npm cache clean --force

COPY . .

EXPOSE 15100

CMD [ "node", "dist/main" ]
