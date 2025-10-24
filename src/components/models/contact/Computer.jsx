import { useGLTF } from "@react-three/drei";

export function Computer(props) {
  const { scene } = useGLTF("/models/i_am_error.glb");

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/i_am_error.glb");

export default Computer;
