FROM node:latest


ADD . /app/

WORKDIR /app/

RUN yarn install

RUN yarn build

RUN npm install -g serve

CMD serve -s build
