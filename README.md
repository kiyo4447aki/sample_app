# 画面遷移図

[画面遷移図（PDf）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/game-app%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB%E5%9B%B3.pdf)

[画面設計（Adobe XD）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/game-app.xd)

[画面 1（PNG）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/Web%201920%20%E2%80%93%201.png)
[画面 2（PNG）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/Web%201920%20%E2%80%93%202.png)
[画面 3（PNG）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/Web%201920%20%E2%80%93%203.png)

# 画面遷移図（UI 改変後）

[画面遷移図（PDf）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/arranged/game-app%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB%E5%9B%B3.pdf?ref_type=heads)

[画面設計（Adobe XD）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/arranged/game-app.xd?ref_type=heads)

[画面 1（PNG）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/arranged/Web%201920%20%E2%80%93%201.png)
[画面 2（PNG）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/arranged/Web%201920%20%E2%80%93%202.png)
[画面 3（PNG）](https://gitlab.com/dev-krc/training/kiyoaki_yamamoto/game-app/-/blob/main/screen-diagram/arranged/Web%201920%20%E2%80%93%203.png?ref_type=heads)

## UI 改変内容

-   タイトルの変更
-   ヘッダー・ボタンのカラーの変更
-   背景の変更
-   ゲームの表示領域のカラーの変更

# k8s の環境構築(Windows 環境下)

1. kubectl、minikube をインストール

2. minikube を起動・クラスタを作成

```
minikube start
```

3. docker を minikube へ接続（Windows 環境下、powershell 上）
   linux 上の`eval $(minikube docker-env)`に相当

```
minikube docker-env --shell powershell | Invoke-Expression
```

5. Docker イメージのビルド

```
docker build -t game-app:1 .
```

6. deployment、service を minikube クラスタへ登録

```
kubectl apply -f ./k8s/deployment.yaml -f ./k8s/service.yaml
```

7. service を通じてアプリにアクセスできることを確認

```
minikube service service-game-app
```

# ingress の環境構築(Windows 環境下)

1. NGINX Ingress コントローラーを有効化

```
minikube addons enable ingress
```

2. ingress を minikube クラスタへ登録

```
kubectl apply -f ./ingress/ingress.yaml
```

3. minikube とホストマシンの 127.0.0.1 をトンネリング

```
minikube tunnel
```

4. ホストマシンの hosts ファイルに`127.0.0.1 kiyoakiyamamoto.info`を追記
5. host 名でアプリにアクセスできることを確認
   ブラウザもしくは curl コマンドを用いて kiyoakiyamamoto.info へアクセス

# ingress の環境構築(Windows 環境下)

1. クラスタ内に前回作成したリソースを削除

```
kubectl delete -f ./k8s/deployment.yaml -f ./k8s/service.yaml -f ./ingress/ingress.yaml
```

2. skaffold のマニフェストファイルを作成

```
skaffold init
```

3. skaffold を起動、pod、replicaset、deployment、service、ingress を作成

```
skaffold dev
```

4. minikube とホストマシンの 127.0.0.1 をトンネリングし(ingress の環境構築を参照)、動作確認

# API の構築

タイピングを行う文字をランダムに取得するメソッドを API に切り出し

1. game-app、API の起動

```
yarn run start
cd api
node index.js
```

2. テスト(jest、RTL)

```
yarn run test
```

3. E2E テスト(Cypress)
   game-app と API を起動した状態で

```
yarn cypress run
```

# API を minikube にデプロイ

1. minikube を起動、docker を minikube に接続(k8s の環境構築を参照)
2. skaffold を起動、pod、replicaset、deployment、service、ingress を作成

```
skaffold dev
```
