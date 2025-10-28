import * as THREE from "three";

const HeroLights = ({ isDark }) => (
  <>
    {/* Main desk lamp - focused on center */}
    <spotLight
      position={[2, 4, 3]}
      angle={0.2}
      penumbra={0.3}
      intensity={isDark ? 100 : 80}
      color={isDark ? "white" : "#fff8dc"}
      target-position={[1, 0, 2]}
    />
    
    {/* Overhead light - softer, focused on desk area */}
    <spotLight
      position={[1, 6, 2]}
      angle={0.25}
      penumbra={0.6}
      intensity={isDark ? 40 : 60}
      color={isDark ? "#4cc9f0" : "#ffffff"}
      target-position={[1, 0, 2]}
    />
    
    {/* Gentle side fill - much softer */}
    <spotLight
      position={[-2, 4, 3]}
      angle={0.3}
      penumbra={0.8}
      intensity={isDark ? 60 : 40}
      color={isDark ? "#9d4edd" : "#fff8dc"}
    />
    
    {/* Area light - smaller and more focused */}
    <primitive
      object={new THREE.RectAreaLight(
        isDark ? "#a259ff" : "#ffffff", 
        isDark ? 8 : 12, 
        2, 
        1.5
      )}
      position={[1, 2.5, 3]}
      rotation={[-Math.PI / 6, 0, 0]}
      intensity={isDark ? 15 : 20}
    />
    
    {/* Subtle atmospheric lights - much dimmer */}
    <pointLight 
      position={[0.5, 1.5, 1.5]} 
      intensity={isDark ? 10 : 15} 
      color={isDark ? "#7209b7" : "#ffffff"} 
    />
    <pointLight 
      position={[1.5, 1, 2.5]} 
      intensity={isDark ? 10 : 12} 
      color={isDark ? "#0d00a4" : "#fff8dc"} 
    />
    
    {/* Softer daylight simulation for light mode */}
    {!isDark && (
      <>
        <directionalLight
          position={[8, 8, 4]}
          intensity={0.4}
          color="#ffffff"
          castShadow
        />
        <hemisphereLight
          skyColor="#e6f3ff"
          groundColor="#f8f9fa"
          intensity={0.3}
        />
      </>
    )}
  </>
);

export default HeroLights;
