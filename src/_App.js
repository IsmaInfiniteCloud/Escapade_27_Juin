import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Globe = () => {
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Vitesse de rotation du modèle sur l'axe Y
    }
  });

  // Chargement du modèle GLB
  const loader = new GLTFLoader();
  loader.load("/earth.glb", (gltf) => {
    const model = gltf.scene;
    model.rotation.x = 0;
    model.position.x = 0;
    model.position.y = 0;
    modelRef.current.add(model);
  });

  return (
    <group>
      <mesh ref={modelRef} />
    </group>
  );
};

export default Globe;
