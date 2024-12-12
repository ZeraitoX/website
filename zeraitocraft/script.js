// 基本設定
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 照明
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5).normalize();
scene.add(light);

// プレイヤー設定
let gameMode = null; // ゲームモード ('survival' または 'creative')
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const speed = 5;

// ワールド設定
const BLOCK_SIZE = 1;
const GRID_SIZE = 10;
const blocks = [];

// メニュー処理
const menu = document.getElementById('menu');
const survivalButton = document.getElementById('survival');
const creativeButton = document.getElementById('creative');

// 小さいブロックを生成
function createBlock(x, y, z, color) {
    const geometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    const material = new THREE.MeshLambertMaterial({ color });
    const block = new THREE.Mesh(geometry, material);
    block.position.set(x, y, z);
    scene.add(block);
    blocks.push(block);
}

// ワールド生成
function createWorld() {
    for (let x = -GRID_SIZE; x < GRID_SIZE; x++) {
        for (let z = -GRID_SIZE; z < GRID_SIZE; z++) {
            const height = Math.floor(Math.random() * 3) + 1;

            for (let y = 0; y < height; y++) {
                const color = y === height - 1 ? 0x00ff00 : 0x8B4513;
                createBlock(x, y, z, color);
            }
        }
    }
}

// ゲーム開始
function startGame(mode) {
    gameMode = mode;
    menu.style.display = 'none';
    createWorld();
    animate();
}

// ゲームモード選択イベント
survivalButton.addEventListener('click', () => startGame('survival'));
creativeButton.addEventListener('click', () => startGame('creative'));

// レンダリングとプレイヤー操作
function animate() {
    requestAnimationFrame(animate);

    if (gameMode === 'creative') {
        // クリエイティブモードでは自由飛行
        camera.position.y += velocity.y * 0.1;
    }

    renderer.render(scene, camera);
}
