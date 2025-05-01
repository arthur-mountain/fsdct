FROM node:lts

RUN corepack enable

WORKDIR /app/server

# P.S. 以 docker-compose 定義的 context 路徑來複製檔案
COPY ./package.json /app/server

RUN pnpm i

# P.S. 以 docker-compose 定義的 context 路徑來複製檔案
COPY . /app/server

CMD ["pnpm", "dev"]
