FROM node:latest
WORKDIR /game-app
COPY . .
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3000