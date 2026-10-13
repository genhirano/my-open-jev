# Open-Jev — Docker Compose / CPU

[Open-Jev](https://github.com/Zefan-Cai/Open-Jev) を CPU で動かし、ローカル HTTP API に判断リクエストを送るためのプロジェクトです。

## 起動

Docker Desktop を起動し、Linux コンテナーモードで使用してください。PowerShell でプロジェクトのディレクトリに移動して実行します。

```powershell
Set-Location C:\dev\my-open-jev
docker compose up -d --build open-jev-cpu
```

初回ビルドでは公開 2B モデルのパッケージと Qwen ベースモデルの重み（約 4.6 GB）をダウンロードするため、インターネット接続と十分なディスク容量が必要です。Python のインストールや手動のモデル取得は不要です。

モデルのロードには時間がかかります。次のコマンドで `open-jev-cpu` が `healthy` になるまで待ってください。

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

CPU 推論は応答まで時間がかかる場合があります。結果は候補の確率などを含む JSON で返り、候補に書かれた操作自体は実行しません。

## Example — ブラウザーで手入力

サーバーが `healthy` になったら <http://127.0.0.1:8791/examples/systemone/index.html> を開きます。エンドポイントと上記 curl と同じサンプルが入力済みなので、設定を変更せず「リクエストを送信」を押すと、右側にレスポンス JSON が表示されます。自動送信はしません。

まずサンプルを送信した後、`state`（状況）や `questions`（質問・候補）を手で修正して再送信できます。`state` を文字列にする場合は前後のダブルクォートを残し、どちらも有効な JSON として入力してください。`choice` は候補選択、`noul` は Yes の確率、`score` は段階評価です。

入力内容は保存されません。ページを再読み込みすると元のサンプルに戻ります。CPU 推論中は送信ボタンが無効になるので、応答を待ってください。

ページが `{"error": "not found"}` になる場合や、ソースを修正した場合は、`docker compose up -d --build open-jev-cpu` を再実行してください。ページはイメージに含まれるため、古いコンテナーには変更が反映されません。更新後は再び `healthy` になるまで待ちます。

## 停止

```powershell
docker compose down
```

## ライセンス

上流: Zefan Cai / Open-Jev contributors。[MIT LICENSE](LICENSE) と [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) を参照してください。公開モデルと Qwen ベースモデルの利用条件はそれぞれの配布元に従います。
