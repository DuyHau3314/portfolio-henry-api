FROM node:16.14.0-alpine

# Create app directory
WORKDIR /usr/src/app

RUN npm i -g pm2

# Install app dependencies
COPY package*.json ./
RUN npm i

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 5000
CMD [ "npm", "start" ]
