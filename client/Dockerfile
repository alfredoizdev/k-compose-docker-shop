FROM node:17-alpine
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY package-lock.json ./
COPY package.json ./
RUN npm install
COPY . ./
COPY public .
EXPOSE 3000:3000
CMD ["npm","start"]

# Stage 2 - productive environment
# FROM nginx:stable-alpine
# COPY --from=build /app/dist /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# RUN apk update  
# RUN apk upgrade 
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]