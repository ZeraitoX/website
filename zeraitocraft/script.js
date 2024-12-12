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
let gameMode = null;
let velocity = new THREE.Vector3();  // プレイヤーの移動速度
let direction = new THREE.Vector3(); // プレイヤーの移動方向
const speed = 0.1;  // プレイヤーの移動速度
const playerHeight = 2;

// ワールド設定
const BLOCK_SIZE = 1;
const GRID_SIZE = 100;
const CHUNK_SIZE = 20;
const blocks = [];

// モブ設定
const mobs = []; // モブを格納する配列

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

// モブ（牛や豚）を生成
function createMob(x, y, z, type) {
    const geometry = new THREE.BoxGeometry(1, 1, 1); // モブのサイズ
    const material = new THREE.MeshLambertMaterial({ color: type === 'cow' ? 0x8B4513 : 0xFF69B4 }); // 牛と豚で色を変更
    const mob = new THREE.Mesh(geometry, material);
    mob.position.set(x, y, z);
    mob.type = type;
    scene.add(mob);
    mobs.push(mob);
}

// モブのAI動作
function updateMobs() {
    mobs.forEach(mob => {
        const distance = mob.position.distanceTo(camera.position);
        
        // プレイヤーとの距離が近くなると避ける
        if (distance < 10) {
            const direction = new THREE.Vector3();
            direction.subVectors(mob.position, camera.position).normalize();
            mob.position.add(direction.multiplyScalar(0.1)); // 少しずつ離れる
        } else {
            const randomDirection = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
            mob.position.add(randomDirection.multiplyScalar(0.05));
        }
    });
}

// ワールド生成
function createWorld() {
    for (let x = -GRID_SIZE / 2; x < GRID_SIZE / 2; x++) {
        for (let z = -GRID_SIZE / 2; z < GRID_SIZE / 2; z++) {
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
    menu.style.display = 'none'; // メニュー非表示
    createWorld();

    // 牛や豚をランダムな位置に配置
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * GRID_SIZE - GRID_SIZE / 2;
        const z = Math.random() * GRID_SIZE - GRID_SIZE / 2;
        const y = 1; // 地面に配置
        createMob(x, y, z, i % 2 === 0 ? 'cow' : 'pig');
    }

    animate();
}

// ゲームモード選択イベント
survivalButton.addEventListener('click', () => startGame('survival'));
creativeButton.addEventListener('click', () => startGame('creative'));

// プレイヤー移動処理
function movePlayer() {
    if (gameMode === 'creative') {
        camera.position.y += velocity.y * 0.1;
    }
    camera.position.x += velocity.x * speed;
    camera.position.z += velocity.z * speed;
}

// キー入力処理
function onKeyDown(event) {
    if (event.key === 'w') velocity.z = -1;
    if (event.key === 's') velocity.z = 1;
    if (event.key === 'a') velocity.x = -1;
    if (event.key === 'd') velocity.x = 1;
    if (event.key === ' ') velocity.y = 1; // ジャンプ
}

function onKeyUp(event) {
    if (event.key === 'w' || event.key === 's') velocity.z = 0;
    if (event.key === 'a' || event.key === 'd') velocity.x = 0;
    if (event.key === ' ') velocity.y = 0; // ジャンプ終了
}

// レンダリングとプレイヤー操作
function animate() {
    requestAnimationFrame(animate);

    movePlayer();
    updateMobs(); // モブのAIを更新

    renderer.render(scene, camera);
}

// イベントリスナー設定
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
