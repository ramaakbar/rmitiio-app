FROM node

WORKDIR /app

COPY ./server/package.json .

RUN npm install

COPY ./server .

RUN npx prisma generate

EXPOSE 8080

RUN npm run build

CMD ["node", "build/src/index.js"]