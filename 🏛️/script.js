// すでに見た本の情報を保存するためのキー
const viewedBooksKey = "viewedBooks";

// ピクセルの数をランダムに設定
const pixelCount = 50; // 本に追加するピクセルの数

// ページが読み込まれたときに実行
window.onload = function () {
  // localStorageから既に見た本のIDを取得
  let viewedBooks = JSON.parse(localStorage.getItem(viewedBooksKey)) || [];

  // すべての本に対してチェック
  const books = document.querySelectorAll(".book");

  books.forEach((book) => {
    const bookText = book.getAttribute("data-text");

    // 本が見たことがあるものであれば、スタイルを変更
    if (viewedBooks.includes(bookText)) {
      book.classList.add("viewed");
    }

    // 本をクリックしたときに「見たことがある」として保存
    book.addEventListener("click", () => {
      if (!viewedBooks.includes(bookText)) {
        viewedBooks.push(bookText);
        localStorage.setItem(viewedBooksKey, JSON.stringify(viewedBooks));
        book.classList.add("viewed");
      }
    });

    // ピクセルをランダムに生成して本に追加
    addRandomPixels(book);
  });
};

// 本にランダムなピクセルを追加する関数
function addRandomPixels(book) {
  for (let i = 0; i < pixelCount; i++) {
    // ピクセルを作成
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");

    // ランダムな色
    const randomColor = `hsl(${Math.random() * 360}, 100%, 80%)`;
    pixel.style.backgroundColor = randomColor;

    // ピクセルのサイズをランダムに
    const randomSize = Math.random() * 4 + 2; // サイズは2px〜6px
    pixel.style.width = `${randomSize}px`;
    pixel.style.height = `${randomSize}px`;

    // ピクセルの位置をランダムに設定
    const x = Math.random() * (book.offsetWidth - randomSize);  // bookの幅内でランダム
    const y = Math.random() * (book.offsetHeight - randomSize); // bookの高さ内でランダム
    pixel.style.left = `${x}px`;
    pixel.style.top = `${y}px`;

    // 本にピクセルを追加
    book.appendChild(pixel);
  }
}

