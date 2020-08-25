FROM node:12

WORKDIR /usr/src/app
COPY . ./
RUN npm install && npm run build && npm prune --production
CMD [ "npm", "start" ]
