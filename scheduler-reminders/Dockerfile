FROM node:20.6.1

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8002

CMD sh -c 'npm run start > /dev/null & sleep infinity'