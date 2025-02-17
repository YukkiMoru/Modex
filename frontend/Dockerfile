# ベースイメージとしてNode.jsの最新LTSバージョンを使用
FROM node:lts

# 作業ディレクトリを設定
WORKDIR /app

# パッケージマネージャーのキャッシュを利用するためにpackage.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# Viteをグローバルにインストール
RUN npm install -g vite

# アプリケーションのソースコードをコピー
COPY . .

# ビルドコマンドを実行
RUN npm run build

# コンテナがリッスンするポートを指定
EXPOSE 9090

# アプリケーションを起動するためのコマンド
CMD ["npm", "run", "dev"]