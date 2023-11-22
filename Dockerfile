FROM node:16.14.0-alpine

# Install Python and build dependencies
RUN apk add --no-cache python3 py3-pip
RUN ln -sf python3 /usr/bin/python
RUN apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev

# Create app directory
WORKDIR /usr/src/app

# Install Yarn
RUN apk add --no-cache yarn

# Install PM2 globally using npm
RUN npm install -g pm2

# Install app dependencies
COPY package*.json ./
RUN yarn

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 5000
CMD [ "yarn", "start" ]
