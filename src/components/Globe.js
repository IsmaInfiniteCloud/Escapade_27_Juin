import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Globe = ({ onAnimationEnd }) => {
  const modelRef = useRef();
  const [isRotating, setIsRotating] = useState(true);
  const [isFadeOut, setIsFadeOut] = useState(false);

  useFrame(({ clock }) => {
    if (isRotating) {
      modelRef.current.rotation.y = clock.elapsedTime; // Rotation en fonction du temps écoulé
    }
  });

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/earth.glb", (gltf) => {
      const model = gltf.scene;
      model.rotation.x = 0;
      model.position.x = 0;
      model.position.y = 0;
      modelRef.current.add(model);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRotating(false); // Arrêter la rotation
      setIsFadeOut(true); // Activer l'effet de fade-out
      onAnimationEnd(); // Appeler la fonction de rappel à la fin de l'animation
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onAnimationEnd]);

  return (
    <group>
      <mesh ref={modelRef}>
        <meshStandardMaterial transparent opacity={isFadeOut ? 0 : 1} />
      </mesh>
    </group>
  );
};

export default Globe;
