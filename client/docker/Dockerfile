FROM node:lts

WORKDIR /app/client

# 安裝 pnpm
RUN npm install -g pnpm

# P.S. 以 docker-compose 定義的 context 路徑來複製檔案
COPY ./package.json ./

RUN pnpm install --frozen-lockfile

# P.S. 以 docker-compose 定義的 context 路徑來複製檔案
COPY . ./

CMD ["pnpm", "start"]
