import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import playerHandRockImg from '../assets/hand-player-rock.png';
import opponentHandRockImg from '../assets/hand-opponent-rock.png';

const Canvas = styled.canvas`
  // height: 720px;
  // width: 1280px;
`;

function GameArea() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    const playerHandImg = new Image();
    playerHandImg.onload = () => {
      context.drawImage(playerHandImg, 0, 22, 70, 128);
    };
    playerHandImg.src = playerHandRockImg;

    const opponentHandImg = new Image();
    opponentHandImg.onload = () => {
      context.drawImage(opponentHandImg, 200, 0, 94, 70);
    };
    opponentHandImg.src = opponentHandRockImg;
  }, []);
  return <Canvas ref={canvasRef} />;
}

export default GameArea;
