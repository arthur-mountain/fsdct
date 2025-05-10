FROM node:lts

WORKDIR /app

# P.S. 以 docker-compose 定義的 context 路徑來複製檔案
COPY ./package.json ./

RUN corepack enable pnpm && pnpm i --frozen-lockfile

# P.S. 以 docker-compose 定義的 context 路徑來複製檔案
COPY . .

CMD ["pnpm", "dev"]
