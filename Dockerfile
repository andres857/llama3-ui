# Etapa de desarrollo 
FROM node:lts-iron AS dev
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "dev"]

# # Stage de compilación 
# FROM node:lts-iron AS build
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 3000
# CMD [ "npm", "run", "deploy" ]


# # Stage de producción
# FROM nginx:alpine3.18 AS prod
# COPY --from=build /usr/src/app/.output /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]