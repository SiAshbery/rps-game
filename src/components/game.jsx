import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCanvas from '../hooks/use-canvas';
import useGameObject from '../hooks/use-game-object';
import playerHandRockImg from '../assets/hand-player-rock.png';
import opponentHandRockImg from '../assets/hand-opponent-rock.png';

const Canvas = styled.canvas`
  margin: 24px;
`;

function Game() {
  const player = useGameObject(
    { x: 0, y: 0 },
    { x: 370, y: 676 },
    playerHandRockImg,
  );
  const opponent = useGameObject(
    { x: 800, y: 0 },
    { x: 470, y: 350 },
    opponentHandRockImg,
  );
  const [setGameObjects, canvasRef, canvasWidth, canvasHeight] = useCanvas([
    player,
    opponent,
  ]);

  useEffect(() => {
    setGameObjects([player]);
  }, []);

  return <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
}

export default Game;
