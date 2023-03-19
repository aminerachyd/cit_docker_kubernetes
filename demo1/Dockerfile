FROM node:lts

COPY package* .

RUN npm install

COPY server.js server.js

ENTRYPOINT ["node", "server.js"]
