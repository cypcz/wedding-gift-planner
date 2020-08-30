FROM node:12.16.2 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:12.16.2

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./
COPY --from=builder /usr/src/app/prisma ./
COPY --from=builder /usr/src/app/.env ./

RUN yarn generate:prisma

CMD [ "yarn", "start" ]