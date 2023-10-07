

FROM node:alpine

RUN apk --no-cache add curl

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ .

EXPOSE 8088

HEALTHCHECK CMD curl -f http://localhost:8088/health-check || exit 1

CMD ["npm", "run", "start"]
