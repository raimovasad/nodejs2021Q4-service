FROM node:16-alpine

ARG PORT

EXPOSE ${PORT}

WORKDIR /app/src

COPY package.json package-lock.json ./

RUN npm install --no-optional 

COPY . .

CMD ["npm", "start"]