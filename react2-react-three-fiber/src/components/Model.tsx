import * as React from "react";
import * as Drei from "@react-three/drei";

const Model: React.FC = () => {
  const { scene } = Drei.useGLTF("assets/gltf/rocket.glb");

  return (
    <group dispose={null}>
      <primitive scale={[1, 1, 1]} object={scene} />
    </group>
  );
};

export default Model;
