FROM node:12.16.2 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn generate

RUN yarn build

FROM node:12.16.2

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./
COPY prisma/schema.prisma ./prisma

RUN yarn generate

CMD [ "yarn", "start" ]