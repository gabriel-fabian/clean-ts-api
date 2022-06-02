FROM node:16.15-alpine as builder

WORKDIR /app

COPY package.json tsconfig.json tsconfig-build.json ./
COPY /src ./src

RUN npm install --ignore-scripts && npm run build

FROM node:16.15-alpine as runner

WORKDIR /app

COPY package.json .

RUN npm install --only=production --ignore-scripts

COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD [ "npm", "start" ]
