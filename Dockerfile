FROM node:16.14.0-alpine

# Install Python and build dependencies
RUN apk add --no-cache python3 py3-pip
RUN ln -sf python3 /usr/bin/python
RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev

# Create app directory
WORKDIR /usr/src/app

# Install nodemon
RUN npm i -g nodemon

RUN npm i -g pm2

# Install app dependencies
COPY package*.json ./
RUN npm i

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 5000
CMD [ "npm", "start" ]
