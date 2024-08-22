FROM node:latest
WORKDIR /mongodb
COPY . .
RUN yarn install
CMD ["node", "index.js"]
EXPOSE 5000
