FROM node:17-alpine as build
WORKDIR /build
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --silent
COPY . .
RUN npm run build

FROM node:17-alpine as production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --silent --production
COPY --from=build /build/dist /app/dist
EXPOSE 8080
CMD ["npm", "start"]