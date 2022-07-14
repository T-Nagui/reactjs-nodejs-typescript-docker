
FROM node:18

WORKDIR /usr/app

COPY package*.json ./

RUN set -eux; \
    yarn install

COPY ./src ./src

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]