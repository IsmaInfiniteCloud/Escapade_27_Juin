import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Globe = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("../public/assets/earth.glb", handleLoad);
  }, []);

  const handleLoad = (gltf) => {
    setModel(gltf.scene);
  };

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <mesh position={[0, 0, 0]} onPointerOver={() => console.log("Hovered")}>
        {model && <primitive object={model} />}
      </mesh>
      <gridHelper args={[10, 10]} />
    </group>
  );
};

const App = () => {
  return (
    <div className="app">
      <Canvas>
        <Globe />
      </Canvas>
    </div>
  );
};

export default App;
