import "./App.css";
import React, { useLayoutEffect } from "react";
import * as THREE from "three";

function App(): JSX.Element {
  useLayoutEffect(() => {
    const width = 960;
    const height = 540;

    const el: HTMLCanvasElement | undefined =
      (document.querySelector("#myCanvas") as HTMLCanvasElement) ?? undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas: el,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 10000);
    camera.position.set(0, 0, 1000);

    // 箱を作成
    const geometry = new THREE.BoxGeometry(250, 250, 250);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const box = new THREE.Mesh(geometry, material);
    box.position.z = -5;
    scene.add(box);

    // 平行光源を生成
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    const tick = (): void => {
      requestAnimationFrame(tick);

      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      // 描画
      renderer.render(scene, camera);
    };
    tick();

    console.log("Hello Three.js");
  }, []);
  return (
    <div className="App">
      <canvas id="myCanvas" height="100%" width="100%"></canvas>
    </div>
  );
}

export default App;
