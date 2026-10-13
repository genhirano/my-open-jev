# Local deployment

See the [local Windows / PowerShell quick start](../README.md) for installation,
the pinned released 2B download, GPU/CPU serving and `curl.exe` requests.

The server exposes `/health`, `/v1/systemone` and the local workbench on port
8791. Keep it bound to `127.0.0.1` unless you provide authentication and HTTPS.
It returns probabilities, not executed actions.

Other retained deployment guides:

- [Docker (CPU / NVIDIA)](../docker/README.md)
- [Apple Silicon](apple-silicon.md)
- [Consumer GPU loading](consumer-gpu.md)
- [Self-hosted Hugging Face Space](../deploy/huggingface-space/README.md)

Historical research reports and public-site assets are not included in this
local checkout. Hardware support is not a guarantee of model quality or memory
requirements for every request.
