// ローディング画面の要素取得
const loadingScreen = document.getElementById('loading-screen');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

// ランダムなネオンカラーを生成
function getRandomNeonColor() {
    const colors = [
        `rgba(0, 255, 127, ${Math.random() * 0.5 + 0.5})`, // 半透明グリーン
        `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.5})`, // 半透明シアン
        `rgba(255, 0, 255, ${Math.random() * 0.5 + 0.5})`  // 半透明マゼンタ
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// パーティクルを生成
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.background = getRandomNeonColor();
    document.body.appendChild(particle);

    // パーティクルの位置を設定
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // アニメーション終了後に削除
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

// テキスト周りにパーティクルを生成
function createAroundTextParticles() {
    const rect = loadingScreen.querySelector('h1').getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const numParticles = 50; // パーティクルの数
    const radius = 100; // 半径

    for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        createParticle(x, y);
    }
}

// ページを表示
function showSite() {
    loadingScreen.style.display = 'none';
    header.style.display = 'block';
    main.style.display = 'block';
    footer.style.display = 'block';
}

// ローディング画面のクリックで表示切り替え
loadingScreen.addEventListener('click', () => {
    createAroundTextParticles();
    setTimeout(showSite, 1000); // 1秒後にサイトを表示
});

// Enterキーでも表示切り替え
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        createAroundTextParticles();
        setTimeout(showSite, 1000);
    }
});

// スクロール時にセクションをフェードイン
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        } else {
            section.style.opacity = 0;
            section.style.transform = 'translateY(50px)';
        }
    });
});
