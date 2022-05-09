// ページの読み込みを待つ
window.addEventListener("DOMContentLoaded", init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const canvasElement = document.querySelector("#myCanvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  // カメラの初期座標を設定
  camera.position.set(0, 10, 10);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);
  controls.target.set(0, 3, 0);
  controls.update();

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  // 環境光を追加
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  // 3DS形式のモデルデータを読み込む
  const loader = new THREE.ColladaLoader();
  // 3dsファイルのパスを指定
  loader.load("../models/collada/elf/elf.dae", (collada) => {
    // 読み込み後に3D空間に追加
    const model = collada.scene;
    scene.add(model);
  });

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}
