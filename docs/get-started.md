# Local text / CSV workbench

Follow the [Windows / PowerShell installation and server commands](../README.md).
When `/health` responds successfully, open <http://127.0.0.1:8791/> or
<http://127.0.0.1:8791/examples/workbench/index.html>.

Paste messages or upload a UTF-8 CSV, enter categories as
`Category name: Category description`, run classification and review the
returned candidate probabilities before exporting results.

The page accepts up to 200 rows and a CSV of at most 2 MB. An “Other” or
“Needs human review” category helps handle inputs outside your category rules.
Candidate probability is not accuracy; validate categories on labeled examples.

“Show an example” displays illustrative content, not measured model output.
Classification of your own text sends it to your local model service. The
workbench does not persist inputs in browser storage; refreshing clears them.

The model proposes classifications only. It does not execute business actions.
For HTTP requests, see `configs/example-request.json` and the README's
`curl.exe` example. For container deployment, see the [Docker guide](../docker/README.md).
