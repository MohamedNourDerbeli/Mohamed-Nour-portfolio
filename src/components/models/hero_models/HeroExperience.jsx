import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "../../../contexts/ThemeContext";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense } from "react";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const { isDark } = useTheme();

  return (
    <div className={`relative rounded-2xl overflow-hidden w-full h-full ${
      isDark 
        ? "bg-gradient-to-br from-gray-900/50 via-blue-900/30 to-purple-900/50 border border-blue-500/30 shadow-2xl shadow-blue-500/20" 
        : "bg-gradient-to-br from-slate-50/90 via-blue-50/70 to-indigo-100/80 border-2 border-blue-300/40 shadow-2xl shadow-blue-300/25"
    } backdrop-blur-sm`}>
      {/* Enhanced decorative corner elements */}
      <div className={`absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 ${
        isDark ? "border-cyan-400" : "border-blue-600 shadow-sm"
      }`}></div>
      <div className={`absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 ${
        isDark ? "border-cyan-400" : "border-blue-600 shadow-sm"
      }`}></div>
      <div className={`absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 ${
        isDark ? "border-cyan-400" : "border-blue-600 shadow-sm"
      }`}></div>
      <div className={`absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 ${
        isDark ? "border-cyan-400" : "border-blue-600 shadow-sm"
      }`}></div>

      {/* Additional corner accents for light mode */}
      {!isDark && (
        <>
          <div className="absolute top-1 left-1 w-1 h-1 bg-blue-500 rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-blue-500 rounded-full"></div>
        </>
      )}

      {/* Enhanced background effects */}
      <div className={`absolute inset-0 rounded-2xl ${
        isDark 
          ? "shadow-[inset_0_0_20px_rgba(0,212,255,0.1)]" 
          : "shadow-[inset_0_0_30px_rgba(59,130,246,0.15)]"
      }`}></div>

      {/* Light mode specific enhancements */}
      {!isDark && (
        <>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-100/30 via-transparent to-white/20 rounded-2xl"></div>
          
          {/* Subtle animated dots */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-indigo-400/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </>
      )}

      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        {/* Theme-aware ambient light - softer */}
        <ambientLight 
          intensity={isDark ? 0.2 : 0.4} 
          color={isDark ? "#1a1a40" : "#f8f9fa"} 
        />
        {/* Configure OrbitControls to disable panning and control zoom based on device type */}
        <OrbitControls
          enablePan={false} // Prevents panning of the scene
          enableZoom={!isTablet} // Disables zoom on tablets
          maxDistance={20} // Maximum distance for zooming out
          minDistance={5} // Minimum distance for zooming in
          minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
          maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
        />

        <Suspense fallback={null}>
          <HeroLights isDark={isDark} />
          <Particles count={100} />
          <group
            scale={isMobile ? 0.7 : 1}
            position={[0, -3.5, 0]}
            rotation={[0, -Math.PI / 4, 0]}
          >
            <Room isDark={isDark} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroExperience;
