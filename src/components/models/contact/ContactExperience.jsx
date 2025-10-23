import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Computer from "./Computer";

const ContactExperience = () => {
  return (
    <Canvas shadows camera={{ position: [0, 3, 7], fov: 45 }}>
      {/* Dark scene background */}
      <color attach="background" args={["#071021"]} />

      {/* Subtle cool ambient */}
      <ambientLight intensity={0.35} color="#9fb4cf" />

      {/* Key cool directional for form */}
      <directionalLight position={[6, 8, 4]} intensity={1.2} color="#7dd3fc" />

      {/* Fill / rim with a soft purple-blue */}
      <directionalLight
        position={[-6, 4, -4]}
        castShadow
        intensity={0.9}
        color="#8b5cf6"
      />

      {/* Center light to gently illuminate the Computer/model */}
      <pointLight
        position={[0, 0.6, -0.4]} // slightly in front and above center
        intensity={1.2}
        distance={6}
        decay={2}
        color="#e8faff"
      />

      {/* subtle warm fill to balance cool tones (very low intensity) */}
      <pointLight position={[0, -0.5, 0]} intensity={0.15} distance={8} color="#ffefd5" />

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={[0, -1.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          {/* Dark, subtle ground */}
          <meshStandardMaterial color="#0b1220" metalness={0.1} roughness={0.9} />
        </mesh>
      </group>

      <group scale={0.03} position={[0, -1.49, -2]} castShadow>
        <Computer />
      </group>
    </Canvas>
  );
};

export default ContactExperience;
