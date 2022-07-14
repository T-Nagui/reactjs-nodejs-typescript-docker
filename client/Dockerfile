
FROM node:18

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN set -eux; \
    yarn install

COPY ./src ./src
COPY ./public ./public


COPY . .

EXPOSE 3000

CMD ["yarn", "start"]