FROM node:18-alpine as build
WORKDIR /build
COPY ./ ./
RUN npm ci --silent
RUN npm run build

FROM node:18-alpine as production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --silent --production
COPY --from=build /build/dist /app/dist
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
