FROM node:10-alpine

MAINTAINER bhagyesh.raut@joshsoftware.com

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

USER node

RUN npm install

EXPOSE 3000

CMD [ "node", "server.js" ]