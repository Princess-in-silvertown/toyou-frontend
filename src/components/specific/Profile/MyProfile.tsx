import { Sky } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Mesh } from 'three';

const TestBox = () => {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01; // X축을 기준으로 회전
      meshRef.current.rotation.y += 0.01; // Y축을 기준으로 회전
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.5 : 1}
      onPointerDown={(event) => setHovered(true)}
      onPointerUp={(event) => setHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

const MyProfile = () => {
  return (
    <Container>
      <Title>나의 프로필</Title>
      <UserImage />
      <div>롤링페이퍼 리스트 (테스트)</div>
      <CanvasContainer>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, 100, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Sky />
          <TestBox />
        </Canvas>
      </CanvasContainer>
      <CanvasContainer>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, 100, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Sky />
          <TestBox />
        </Canvas>
      </CanvasContainer>
      <CanvasContainer>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, 100, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Sky />
          <TestBox />
        </Canvas>
      </CanvasContainer>
      <CanvasContainer>
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, 100, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Sky />
          <TestBox />
        </Canvas>
      </CanvasContainer>
    </Container>
  );
};

export default MyProfile;
const CanvasContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  margin: 25px 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  box-sizing: border-box;

  font-size: 18px;
  color: gray;
`;

const UserImage = styled.div`
  width: 330px;
  height: 200px;
  border-radius: 10px;

  background-color: lightgray;
`;
