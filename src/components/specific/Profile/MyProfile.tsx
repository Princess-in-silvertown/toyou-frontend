import {
  Box,
  CameraControls,
  CubeCamera,
  DragControls,
  Image,
  MapControls,
  Sky,
  Text,
  useCamera,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import styled from 'styled-components';
import test from '../../../assets/fonts/Gothic_Goding.woff';
import Paper from '../canvas/Paper';

import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { Camera, PerspectiveCamera, Vector3 } from 'three';
import { RefObject, useRef, useState } from 'react';

interface Props {
  isTrigger: boolean;
}

const SmoothLookAtCamera = ({ isTrigger }: Props) => {
  const target = new Vector3(0, -2, 2);
  const position = new Vector3(0, -4, 4);
  const cameraControlsRef = useRef<CameraControls>(null!);

  useFrame((state, delta) => {
    if (cameraControlsRef.current && isTrigger) {
      const controls = cameraControlsRef.current;
      // 현재 카메라 위치
      const currentPosition = new Vector3();
      controls.getPosition(currentPosition);
      // 현재 타겟 위치
      const currentTarget = new Vector3();
      controls.getTarget(currentTarget);

      // 위치와 타겟을 보간합니다.
      currentPosition.lerp(position, 0.1);
      currentTarget.lerp(target, 0.1);

      // 업데이트된 위치와 타겟을 설정합니다.
      controls.setLookAt(
        currentPosition.x,
        currentPosition.y,
        currentPosition.z,
        currentTarget.x,
        currentTarget.y,
        currentTarget.z,
        true
      );
    }
  });

  return <CameraControls ref={cameraControlsRef} />;
};
const MyProfile = () => {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const cameraControlsRef = useRef<CameraControls>(null!);
  const handleClickPaper = () => {
    setIsPointerDown(true);
  };

  return (
    <Container>
      <Title>나의 프로필</Title>
      <UserImage />
      <div>롤링페이퍼 리스트 (테스트)</div>
      <CanvasContainer>
        <Canvas>
          <axesHelper />
          <SmoothLookAtCamera isTrigger={isPointerDown} />
          <ambientLight intensity={10} />
          <pointLight
            position={[-10, 1000, -10]}
            decay={0}
            intensity={Math.PI}
          />{' '}
          <Paper position={[0, 0, -0.1]} onPointerDown={handleClickPaper} />
          {/* <EffectComposer>
            <DepthOfField
              focusDistance={10} // where to focus
              focalLength={300} // focal length
              bokehScale={10} // bokeh size
            />
          </EffectComposer> */}
          <Text
            fontSize={0.5}
            lineHeight={1}
            maxWidth={7}
            color={'gray'}
            font={test}
            textAlign="center"
            castShadow={false}
          >
            약간긴롤링페이퍼메세지 약간긴 롤링 페이퍼메세지
            약간긴롤링페이퍼메세지 약간긴 롤링페이퍼메세지 약간긴롤링
            페이퍼메세지 약간긴롤링페이퍼메세지 약간긴롤링페 이퍼메세지 약간긴
            롤링페이퍼메세지 약간긴롤링페이퍼메세지 약간긴 롤링페 이퍼메세지
          </Text>
          <Text
            position={[4, 5, 0]}
            fontSize={0.3}
            lineHeight={1}
            maxWidth={4}
            color={'gray'}
            font={test}
            textAlign="center"
            castShadow={false}
          >
            약간긴롤링페이퍼메세지 약간긴 롤링 페이퍼메세지
            약간긴롤링페이퍼메세지 약간긴 롤링페이퍼메세지 약간긴롤링
            페이퍼메세지 약간긴롤링페이퍼메세지 약간긴롤링페 이퍼메세지 약간긴
            롤링페이퍼메세지 약간긴롤링페이퍼메세지 약간긴 롤링페 이퍼메세지
          </Text>
          <Image
            url="https://cdn-icons-png.flaticon.com/512/1482/1482221.png"
            scale={[1.8, 1.8]}
            position={[2.4, -2.2, 0]}
            transparent={true}
          />
          <Sky />
        </Canvas>
      </CanvasContainer>
    </Container>
  );
};

export default MyProfile;
const CanvasContainer = styled.div`
  width: 100%;
  height: 1000px;
  border-radius: 10px;
  overflow: hidden;
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

  font-family: 'Gothic_Goding';
  font-size: 18px;
  color: gray;
`;

const UserImage = styled.div`
  width: 330px;
  height: 200px;
  border-radius: 10px;

  background-color: lightgray;
`;
