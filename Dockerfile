FROM node:12.22-alpine 
WORKDIR /app
COPY package.json package.json 
RUN npm install
COPY .env .env
COPY . /app
CMD ["node", "dist/index.js"]
