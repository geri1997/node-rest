FROM node:latest
WORKDIR /index
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run tsc
EXPOSE 3000
CMD ["npm","start"]