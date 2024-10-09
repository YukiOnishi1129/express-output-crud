# express-output-crud

## 開発手順

### migration ファイル生成

```
<!-- 事前にdbコンテナを起動しておく -->
docker compose up -d

cd backend

<!-- migration ファイル生成コマンド -->
NAME=TableName npm run migration:generate

<!-- todosテーブルを作りたい場合 -->
NAME=TodoTable npm run migration:generate

```

### migration 実行　(テーブル作成)

```
<!-- 事前にdbコンテナを起動しておく -->
docker compose up -d

cd backend

<!-- migration 実行コマンド -->

npm run migration:run

```

- migration が正しく実行されたか確認

```
<!-- 事前にdbコンテナを起動しておく -->
docker compose up -d

<!-- rootディレクトリに移動 -->

<!-- dbコンテナにログイン -->
make db-sh

<!-- mysqlにログイン -->
mysql -u root -p

'Enter password:'と聞かれるので、自分で設定したパスワードを入力 (デフォルトだとpass)

<!-- データベースを選択 -->
use DATABASE_NAME;
<!-- 例: デフォルトだとEXPRESS_OUTPUT_CRUD_DB -->
use EXPRESS_OUTPUT_CRUD_DB;

<!-- テーブルを閲覧 -->
show tables;

todosのテーブルがあればOK

```

### seeding 実行　(初期データ作成)
