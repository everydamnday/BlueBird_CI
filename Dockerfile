FROM node:15
WORKDIR /app
COPY package*.json ./
#RUN npm install --global npm
COPY . .
CMD [ "npm","run","start" ]
EXPOSE 3005
