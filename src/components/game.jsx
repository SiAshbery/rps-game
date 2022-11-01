import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useCanvas from '../hooks/use-canvas';
import useCompetitor from '../hooks/use-competitor';
import playerHandRockImg from '../assets/hand-player-rock.png';
import playerHandPaperImg from '../assets/hand-player-paper.png';
import playerHandScissorsImg from '../assets/hand-player-scissors.png';
import opponentHandRockImg from '../assets/hand-opponent-rock.png';
import opponentHandPaperImg from '../assets/hand-opponent-paper.png';
import opponentHandScissorsImg from '../assets/hand-opponent-scissors.png';
import pressStartImg from '../assets/press-start.png';
import youWinImg from '../assets/you-win.png';
import youLoseImg from '../assets/you-lose.png';
import drawImg from '../assets/draw.png';
import useGameObject from '../hooks/use-game-object';
import CONSTANTS from '../constants';

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
  const [gameState, setCurrentGameState] = useState('start');
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
      paper: opponentHandPaperImg,
      scissors: opponentHandScissorsImg,
    },
  );
  const pressStartPrompt = useGameObject(
    { x: 400, y: 260 },
    { x: 512, y: 128 },
    pressStartImg,
  );
  const youWinPrompt = useGameObject(
    { x: 400, y: 260 },
    { x: 512, y: 128 },
    youWinImg,
  );
  const youLosePrompt = useGameObject(
    { x: 400, y: 260 },
    { x: 512, y: 128 },
    youLoseImg,
  );
  const drawPrompt = useGameObject(
    { x: 400, y: 260 },
    { x: 512, y: 128 },
    drawImg,
  );
  const availableScenes = {
    start: [pressStartPrompt],
    play: [player, opponent],
    win: [player, opponent, youWinPrompt],
    lose: [player, opponent, youLosePrompt],
    draw: [player, opponent, drawPrompt],
  };
  const [render, canvasRef, canvasWidth, canvasHeight] = useCanvas();

  useEffect(() => {
    render(availableScenes[gameState]);
  }, [player, opponent, gameState]);

  const determineWinner = (chosenHand) => {
    const opponentHand = Object.keys(CONSTANTS.availableHands)[
      Math.floor(Math.random() * Object.keys(CONSTANTS.availableHands).length)
    ];
    player.setHandState(chosenHand);
    opponent.setHandState(opponentHand);
    if (CONSTANTS.availableHands[chosenHand].beats === opponentHand) {
      setCurrentGameState('win');
      return;
    }
    if (CONSTANTS.availableHands[opponentHand].beats === chosenHand) {
      setCurrentGameState('lose');
      return;
    }
    if (opponentHand === chosenHand) {
      setCurrentGameState('draw');
    }
  };

  return (
    <GameArea>
      <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      {(() => {
        switch (gameState) {
          case 'start':
            return (
              <GamePlayButton onClick={() => setCurrentGameState('play')}>
                Start Game
              </GamePlayButton>
            );
          default:
            return (
              <PlayerAttackOptions>
                <GamePlayButton onClick={() => determineWinner('rock')}>
                  Select Rock
                </GamePlayButton>
                <GamePlayButton onClick={() => determineWinner('paper')}>
                  Select Paper
                </GamePlayButton>
                <GamePlayButton onClick={() => determineWinner('scissors')}>
                  Select Scissors
                </GamePlayButton>
              </PlayerAttackOptions>
            );
        }
      })()}
    </GameArea>
  );
}

export default Game;
