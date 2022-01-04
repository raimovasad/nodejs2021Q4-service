FROM node:16.13.1

WORKDIR /code

ENV PORT 4000

RUN npm install && tsc

COPY . /code

CMD ["node", "--experimental-modules --es-module-specifier-resolution=node dist/server.js"]