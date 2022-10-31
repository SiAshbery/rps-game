import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCanvas from '../hooks/use-canvas';
import useCompetitor from '../hooks/use-competitor';
import playerHandRockImg from '../assets/hand-player-rock.png';
import playerHandPaperImg from '../assets/hand-player-paper.png';
import playerHandScissorsImg from '../assets/hand-player-scissors.png';
import opponentHandRockImg from '../assets/hand-opponent-rock.png';
import opponentHandpaperImg from '../assets/hand-opponent-paper.png';
import opponentHandScissorsImg from '../assets/hand-opponent-scissors.png';

const Canvas = styled.canvas`
  margin: 24px 0;
`;

const GameArea = styled.div`
  margin: 24px;
  width: 1280px;
  margin: auto;
`;

const GamePlayButton = styled.button`
  background: '#252525';
  cursor: pointer;
`;

const PlayerAttackOptions = styled.div`
  display: flex;
`;

function Game() {
  const player = useCompetitor(
    { x: 0, y: 0 },
    { x: 370, y: 676 },
    {
      rock: playerHandRockImg,
      paper: playerHandPaperImg,
      scissors: playerHandScissorsImg,
    },
  );
  const opponent = useCompetitor(
    { x: 800, y: 0 },
    { x: 470, y: 350 },
    {
      rock: opponentHandRockImg,
      paper: opponentHandpaperImg,
      scissors: opponentHandScissorsImg,
    },
  );
  const [render, canvasRef, canvasWidth, canvasHeight] = useCanvas([
    player,
    opponent,
  ]);

  useEffect(() => {
    render();
  }, [player, opponent]);

  return (
    <GameArea>
      <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      <PlayerAttackOptions>
        <GamePlayButton onClick={() => player.setHandState('rock')}>
          Select Rock
        </GamePlayButton>
        <GamePlayButton onClick={() => player.setHandState('paper')}>
          Select Paper
        </GamePlayButton>
        <GamePlayButton onClick={() => player.setHandState('scissors')}>
          Select Scissors
        </GamePlayButton>
      </PlayerAttackOptions>
    </GameArea>
  );
}

export default Game;
