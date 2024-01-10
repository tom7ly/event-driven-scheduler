FROM node:20.6.1

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm cache clean --force
RUN npm install
RUN npm update scheduler-shared --force



EXPOSE 8001

# CMD sh -c 'npm run start > /dev/null & sleep infinity'
RUN npm run build
CMD ["npm", "run", "start"]