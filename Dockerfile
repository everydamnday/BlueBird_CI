FROM node:14.16.1
WORKDIR /app
COPY package*.json ./
COPY . .
CMD [ "npm","run","start" ]
EXPOSE 3000
