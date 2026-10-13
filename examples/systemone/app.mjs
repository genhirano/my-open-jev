import {makeRequest} from './logic.mjs';

const $ = id => document.getElementById(id);
$('send').addEventListener('click', async () => {
  $('error').textContent = '';
  $('response').textContent = '新しいレスポンスはありません。';
  $('send').disabled = true;
  $('status').textContent = '送信中…';
  try {
    const request = makeRequest($('state').value, $('questions').value);
    const response = await fetch($('endpoint').value.trim(), {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(300000),
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`JSON レスポンスを読み取れませんでした (HTTP ${response.status})。`);
    }
    $('response').textContent = JSON.stringify(data, null, 2);
    if (!response.ok) {
      $('status').textContent = `HTTP ${response.status}`;
      $('error').textContent = data.error || 'リクエストに失敗しました。';
    } else {
      $('status').textContent = '完了';
    }
  } catch (error) {
    $('status').textContent = '送信できませんでした';
    $('error').textContent = error.message;
  } finally {
    $('send').disabled = false;
  }
});
