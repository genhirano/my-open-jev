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

## 停止

```powershell
docker compose down
```

## ライセンス

上流: Zefan Cai / Open-Jev contributors。[MIT LICENSE](LICENSE) と [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) を参照してください。公開モデルと Qwen ベースモデルの利用条件はそれぞれの配布元に従います。
