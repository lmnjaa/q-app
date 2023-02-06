FROM node:latest
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /app
RUN npm run tsc
ADD .env /app
ENV NODE_ENV=production
CMD ["node", "dist/src/index.js"]