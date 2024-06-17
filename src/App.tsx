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
          <></>
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
