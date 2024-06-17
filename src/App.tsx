import { Box, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import styled from 'styled-components';
import { WebGLRenderer } from 'three';

const App = () => {
  useEffect(() => {
    const renderer = new WebGLRenderer();
    const gl = renderer.getContext();
    const webglVersion = gl.getParameter(gl.VERSION);
    console.log('WebGL Version:', webglVersion);
  }, []);

  return (
    <div>
      <CanvasBox>
        <Canvas>
          {' '}
          <Box />
          <Sky />
          {/* <CameraControls />
          <KeyboardControls
            map={[
              { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
              { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
              { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
              { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
              { name: 'jump', keys: ['Space'] },
            ]}
          >
            <OrbitControls />
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
            <Suspense fallback={null}></Suspense> */}
          {/* </KeyboardControls> */}
        </Canvas>
      </CanvasBox>
    </div>
  );
};

export default App;

const CanvasBox = styled.div`
  width: 800px;
  height: 600px;
`;
