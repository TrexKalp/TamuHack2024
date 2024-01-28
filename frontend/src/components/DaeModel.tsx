import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
};

const GLTFModel = ({ modelPath }) => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
      </Suspense>
    </Canvas>
  );
};

export default GLTFModel;
