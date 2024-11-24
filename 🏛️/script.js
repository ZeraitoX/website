// script.js

document.getElementById('fetchButton').addEventListener('click', () => {
  // 表示するコンテナを初期化
  const dataContainer = document.getElementById('dataContainer');
  const controller = new AbortController();
  const signal = controller.signal;

  // ボタンをクリックしたら、ロード中のメッセージを表示
  dataContainer.style.display = 'block';
  dataContainer.innerHTML = 'データを取得しています...';

  // 非同期リクエストを送信
  fetch('https://jsonplaceholder.typicode.com/posts', { signal })
    .then(response => {
      if (!response.ok) {
        throw new Error('ネットワークエラー');
      }
      return response.json();
    })
    .then(data => {
      // 取得したデータを表示
      dataContainer.innerHTML = '<h3>取得したデータ:</h3>';
      data.slice(0, 5).forEach(post => {
        dataContainer.innerHTML += `<p><strong>${post.title}</strong><br>${post.body}</p>`;
      });
    })
    .catch(error => {
      // エラー処理
      if (error.name === 'AbortError') {
        dataContainer.innerHTML = '<span class="error">リクエストはキャンセルされました</span>';
      } else {
        dataContainer.innerHTML = `<span class="error">エラーが発生しました: ${error.message}</span>`;
      }
    });

  // 3秒後にリクエストをキャンセルする
  setTimeout(() => {
    controller.abort();
  }, 3000);  // 3秒後にキャンセル
});
