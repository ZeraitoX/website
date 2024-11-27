// ローディング画面の要素取得
const loadingScreen = document.getElementById('loading-screen');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

// ページを表示
function showSite() {
    loadingScreen.style.display = 'none'; // ローディング画面を非表示
    header.style.display = 'block'; // ヘッダーを表示
    main.style.display = 'block'; // メインコンテンツを表示
    footer.style.display = 'block'; // フッターを表示
}

// ローディング画面のクリックで表示切り替え
loadingScreen.addEventListener('click', () => {
    showSite();
});

// Enterキーでも表示切り替え
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        showSite();
    }
});
