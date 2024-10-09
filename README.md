# express-output-crud

## 開発手順

### migration ファイル生成

```
<!-- 事前にdbコンテナを起動する -->
docker compose up -d

cd backend

<!-- migration ファイル生成コマンd -->
NAME=TableName npm run migration:generate

<!-- todosテーブルを作りたい場合 -->
NAME=TodoTable npm run migration:generate

```
