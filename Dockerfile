FROM node:16-alpine as production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --silent --production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]