FROM node:18

WORKDIR /app

COPY . .

RUN npm install -g pm2

RUN npm install

RUN npm run build

ENV PORT=8877

EXPOSE 8877

CMD ["pm2-runtime", "start", "npm", "--", "start"]
