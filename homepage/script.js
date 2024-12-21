document.addEventListener('DOMContentLoaded', () => {
    const sideMenu = document.getElementById('sideMenu');
    let menuOpened = false;

    // マウスが右側に近づいたときにメニューを開く
    document.addEventListener('mousemove', (event) => {
        if (!menuOpened && event.clientX > window.innerWidth - 50) {
            sideMenu.style.right = '0';
            menuOpened = true;
        }
    });

    // マウスが十分左に移動したらメニューを閉じる
    document.addEventListener('mousemove', (event) => {
        if (menuOpened && event.clientX < window.innerWidth - 200) {
            sideMenu.style.right = '-150px';
            menuOpened = false;
        }
    });
});

