// script.js

// 本をクリックした時のアクションを設定
document.querySelectorAll('.book').forEach(book => {
  book.addEventListener('click', function() {
    alert('あなたは ' + book.getAttribute('data-text') + ' を選びました。');
  });
});

