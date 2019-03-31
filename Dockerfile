FROM node:10
WORKDIR /usr/src/app
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 9613
CMD [ "npm", "start" ]