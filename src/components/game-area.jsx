import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  height: 720px;
  width: 1280px;
`;

function GameArea() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);
  return <Canvas ref={canvasRef} />;
}

export default GameArea;
