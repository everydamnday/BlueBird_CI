FROM node:14.16.1
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD [ "npm","run","start" ]
EXPOSE 3005