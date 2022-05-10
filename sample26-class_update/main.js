// ページの読み込みを待つ
window.addEventListener("DOMContentLoaded", init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 500);

  // 独自グループを作る
  const myGroup = new MyGroup();
  scene.add(myGroup);

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // 更新命令を実行します。
    myGroup.update();

    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}

/** メッシュを継承した独自グループのクラスです。 */
class MyGroup extends THREE.Object3D {
  /** コンストラクターです。 */
  constructor() {
    super();

    // 球体を作成
    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(40, 20, 40),
      new THREE.MeshNormalMaterial()
    );

    // ドーナツを作成
    this.donuts = new THREE.Mesh(
      new THREE.TorusGeometry(120, 40, 60, 60),
      new THREE.MeshNormalMaterial()
    );

    // グループに追加
    this.add(this.sphere);
    this.add(this.donuts);
  }

  /** 更新命令を定義します。 */
  update() {
    // X軸に動かす
    this.sphere.position.x = 200 * Math.sin(Date.now() / 500);

    // 回転させる
    this.donuts.rotation.y += 0.01;
  }
}
