

# minikube,ingress,skaffold の環境構築

1. kubectl、minikube、skaffold をインストール

2. minikube を起動・クラスタを作成

```
minikube start
```

3. docker を minikube へ接続
windows環境下
```
minikube docker-env --shell powershell | Invoke-Expression
```
Ubuntu環境下
"""
eval $(minikube docker-env)
"""

4. NGINX Ingress コントローラーを有効化

```
minikube addons enable ingress
```





4. ホストマシンの hosts ファイルに`127.0.0.1 kiyoakiyamamoto.info`を追記
5. host 名でアプリにアクセスできることを確認
   ブラウザもしくは curl コマンドを用いて kiyoakiyamamoto.info へアクセス

# skaffold の環境構築(Windows 環境下)

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



# API を minikube にデプロイ

1. minikube を起動、docker を minikube に接続(k8s の環境構築を参照)
2. skaffold を起動、pod、replicaset、deployment、service、ingress を作成

```
skaffold dev
```

3. minikube とホストマシンの 127.0.0.1 をトンネリング

```
minikube tunnel
```

3. minikube のトンネリングを行い`minikube tunnel`、ホストマシンの hosts ファイルに`127.0.0.1 webapi.kiyoakiyamamoto.info`を追記

# postgres api の環境構築（minikube上）

1. minikube を起動、docker を minikube に接続(k8s の環境構築を参照)
2. skaffold を起動、pod、replicaset、deployment、service、ingress を作成
```
skaffold dev
```
3. postgresを用いたAPIとDBサーバの接続が確立するまで待機
4. windows環境下であれば`minikube tunnel`を実行、ホストマシンの hosts ファイルに`127.0.0.1 postgre.webapi.kiyoakiyamamoto.info`を追記

# mongodb api の環境構築（minikube上）

1. minikube を起動、docker を minikube に接続(k8s の環境構築を参照)
2. skaffold を起動、pod、replicaset、deployment、service、ingress を作成
```
skaffold dev
```
3. mongodbを用いたAPIとDBサーバの接続が確立するまで待機
4. windows環境下であれば`minikube tunnel`を実行、ホストマシンの hosts ファイルに`127.0.0.1 mongo.webapi.kiyoakiyamamoto.info`を追記