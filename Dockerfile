FROM node:16-alpine

ARG PORT

EXPOSE ${PORT}

WORKDIR /app/src

COPY package.json package-lock.json /app/

COPY tsconfig.json ormconfig.json /app/

RUN npm install --no-optional 

COPY . .

CMD ["npm", "start"]