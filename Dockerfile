FROM node:14.16.1
WORKDIR /app
COPY package*.json ./
RUN npm install --global npm
COPY . .
CMD [ "npm","run","start" ]
EXPOSE 3005
