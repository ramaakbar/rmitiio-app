FROM node

WORKDIR /app

COPY ./client/package.json .

RUN npm install

COPY ./client .

# development
# EXPOSE 5173

# CMD ["npm", "run", "dev"]

# production
EXPOSE 4173

RUN npm run build

CMD ["npm", "run", "preview"]