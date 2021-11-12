FROM node:14.16.1
RUN npm install
CMD [ "npm","run","start" ]
EXPOSE 3000