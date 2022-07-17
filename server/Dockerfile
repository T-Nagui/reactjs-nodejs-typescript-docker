
FROM node:18

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN set -eux; \
    yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]