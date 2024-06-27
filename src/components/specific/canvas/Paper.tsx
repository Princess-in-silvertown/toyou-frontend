import { useTexture } from '@react-three/drei';
import { RepeatWrapping } from 'three';
import paper from '@assets/paper.jpg';
import { MeshProps } from '@react-three/fiber';

const Paper = (props: MeshProps) => {
  const texture = useTexture<string>(paper);
  texture.wrapS = texture.wrapT = RepeatWrapping;

  return (
    <group>
      <mesh receiveShadow {...props} scale={0.4}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial map={texture} map-repeat={[24, 24]} />
      </mesh>
    </group>
  );
};

export default Paper;
