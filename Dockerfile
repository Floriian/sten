FROM node:18-alpine

WORKDIR /rest_api

COPY package.json ./
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn global add @nestjs/cli

RUN yarn build

CMD [ "yarn", "start:prod" ]