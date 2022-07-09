FROM node:lts

WORKDIR /app/client

# P.S. 以 docker-compose 定義的 context 路徑來複製檔案
COPY ./package.json ./

RUN yarn && yarn cache clean --mirror

# P.S. 以 docker-compose 定義的 context 路徑來複製檔案
COPY . ./

CMD ["yarn", "start"]
