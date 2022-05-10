// ページの読み込みを待つ
window.addEventListener("DOMContentLoaded", init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(-100, 150, 500);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 地面を作成
  scene.add(new THREE.GridHelper(600));
  scene.add(new THREE.AxesHelper(300));

  // グループを作る
  const group = new MyGroup();
  // 3D空間にグループを追加する
  scene.add(group);

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    group.rotation.y += 0.01;

    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}

/** グループを継承したサブクラスです。 */
class MyGroup extends THREE.Group {
  constructor() {
    // 何かのクラスを継承した場合はsuper()を呼び出す必要がある
    super();

    const length = 10; // for文の回数
    for (let i = 0; i < length; i++) {
      // 直方体を作成
      const material = new THREE.MeshNormalMaterial();
      const geometry = new THREE.SphereGeometry(30, 30, 30);
      const mesh = new THREE.Mesh(geometry, material);

      // 配置座標を計算
      const radian = (i / length) * Math.PI * 2;
      mesh.position.set(
        200 * Math.cos(radian), // X座標
        30, // Y座標
        200 * Math.sin(radian) // Z座標
      );

      // グループに追加する
      this.add(mesh);
    }
  }
}
