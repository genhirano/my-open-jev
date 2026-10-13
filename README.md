# Open-Jev — Docker Compose / GPU・CPU

[Open-Jev](https://github.com/Zefan-Cai/Open-Jev) を GPU（または CPU）で動かし、ローカル HTTP API に判断リクエストを送るためのプロジェクトです。

## 起動

Docker Desktop を起動し、Linux コンテナーモードで使用してください。PowerShell でプロジェクトのディレクトリに移動して実行します。

GPU と CPU の 2 つのサービスがあり、**NVIDIA GPU がある環境では GPU モードを推奨**します。どちらも同じポート（8791）を使うため、同時には起動できません。

初回ビルドでは公開 2B モデルのパッケージと Qwen ベースモデルの重み（約 4.6 GB）をダウンロードします。インターネット接続と十分なディスク容量が必要です。Python のインストールや手動のモデル取得は不要です。

### GPU モード（推奨）

前提条件:

- NVIDIA GPU と最新の NVIDIA ドライバー
- Docker Desktop の WSL2 バックエンド（コンテナーから GPU が使える状態）
- Linux の場合は NVIDIA Container Toolkit

```powershell
Set-Location C:\dev\my-open-jev
docker compose up -d --build open-jev
```

イメージには CUDA 版の PyTorch が含まれるため、約 12 GB になります。モデルのロードは GPU では短時間（目安は数十秒）で、次のコマンドで `open-jev` が `healthy` になれば準備完了です。

```powershell
docker compose ps open-jev
```

補足:

- GPU メモリ不足になる場合は、`JEV_BATCH_SIZE`（既定 32）を下げてください。例: `$env:JEV_BATCH_SIZE = "8"; docker compose up -d open-jev`
- ドライバーが古く、既定の CUDA 12.8 版が動かない場合は、`docker build --build-arg TORCH_INDEX_URL=https://download.pytorch.org/whl/cu126 -t open-jev:2b .; docker compose up -d open-jev` のように別の CUDA 版をビルドしてから、`--build` を付けずに起動できます。再ビルド時も同じビルド引数を指定してください。
- `could not select device driver "nvidia"` と表示される場合は、コンテナーから GPU を使う環境が整っていません。環境を確認するか、下記の CPU モードを使用してください。
- 設定項目の詳細は [Docker ガイド](docker/README.md) を参照してください。

### CPU モード（GPU がない場合）

```powershell
Set-Location C:\dev\my-open-jev
docker compose up -d --build open-jev-cpu
```

CPU 推論は GPU よりかなり遅くなります。モデルのロードにも時間がかかるため、次のコマンドで `open-jev-cpu` が `healthy` になるまで待ってください。初回ロードに備え、ヘルスチェックには 15 分の起動猶予を設定しています。

```powershell
docker compose ps open-jev-cpu
```

## Example — curl.exe

プロジェクトのディレクトリから、サンプルの JSON を POST します。

```powershell
curl.exe --fail -X POST http://127.0.0.1:8791/v1/systemone `
  -H "Content-Type: application/json" `
  --data-binary "@configs/example-request.json"
```

CPU モードでは応答まで時間がかかる場合があります。結果は候補の確率などを含む JSON で返り、候補に書かれた操作自体は実行しません。

## Example — ブラウザーで手入力

サーバーが `healthy` になったら <http://127.0.0.1:8791/examples/systemone/index.html> を開きます。エンドポイントと上記 curl と同じサンプルが入力済みなので、設定を変更せず「リクエストを送信」を押すと、右側にレスポンス JSON が表示されます。自動送信はしません。

まずサンプルを送信した後、`state`（状況）や `questions`（質問・候補）を手で修正して再送信できます。`state` を文字列にする場合は前後のダブルクォートを残し、どちらも有効な JSON として入力してください。`choice` は候補選択、`noul` は Yes の確率、`score` は段階評価です。

入力内容は保存されません。ページを再読み込みすると元のサンプルに戻ります。推論中は送信ボタンが無効になるので、応答を待ってください。

ページが `{"error": "not found"}` になる場合や、ソースを修正した場合は、`docker compose up -d --build open-jev`（CPU モードは `open-jev-cpu`）を再実行してください。ページはイメージに含まれるため、古いコンテナーには変更が反映されません。更新後は再び `healthy` になるまで待ちます。

## 停止

```powershell
docker compose down
```

CPU モードを起動していた場合も同じコマンドで停止できます。

## ライセンス

上流: Zefan Cai / Open-Jev contributors。[MIT LICENSE](LICENSE) と [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) を参照してください。公開モデルと Qwen ベースモデルの利用条件はそれぞれの配布元に従います。
