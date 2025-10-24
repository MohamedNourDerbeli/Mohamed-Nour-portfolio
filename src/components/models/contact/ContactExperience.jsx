import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

import Computer from "./Computer";

// Static phone component (no rotation)
function StaticPhone() {
  return (
    <group scale={1.2} position={[0, -1.5, 0]}>
      <Computer />
    </group>
  );
}

const ContactExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      {/* Dark blue background to match site theme */}
      <color attach="background" args={["#0f172a"]} />

      {/* Cool blue ambient lighting */}
      <ambientLight intensity={0.4} color="#1e293b" />

      {/* Configure OrbitControls similar to Hero */}
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={!isTablet} // Disables zoom on tablets
        maxDistance={7} // Maximum distance for zooming out
        minDistance={5} // Minimum distance for zooming in
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />

      {/* Cool blue theme lighting */}
      <directionalLight position={[5, 5, 5]} intensity={1.0} color="#3b82f6" />
      <directionalLight position={[-5, 5, 5]} intensity={0.8} color="#1d4ed8" />
      <pointLight position={[0, 2, 2]} intensity={1.2} color="#60a5fa" />
      <pointLight position={[0, -2, 2]} intensity={0.6} color="#1e40af" />

      <Suspense fallback={null}>
        <group scale={isMobile ? 0.7 : 1} position={[0, -1, 0]}>
          <StaticPhone />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default ContactExperience;
