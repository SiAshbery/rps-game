import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// hooks
import useCanvas from '../hooks/use-canvas';

// game objects
import competitors from '../game-objects/competitors';
import ui from '../game-objects/ui';

// constants
import { availableHands } from '../constants';

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

  const { player, opponent } = competitors();
  const {
    pressStartPrompt,
    youWinPrompt,
    youLosePrompt,
    drawPrompt,
    scoreCounter,
    gamesWonText,
    roundCounter,
    roundsWonText,
  } = ui();

  const availableScenes = {
    start: [pressStartPrompt, gamesWonText, scoreCounter],
    play: [player, opponent, roundsWonText, roundCounter],
    win: [player, opponent, roundsWonText, roundCounter, youWinPrompt],
    lose: [player, opponent, roundsWonText, roundCounter, youLosePrompt],
    draw: [player, opponent, roundsWonText, roundCounter, drawPrompt],
  };

  const [render, canvasRef, canvasWidth, canvasHeight] = useCanvas();

  const changeScene = (newScene) => {
    scoreCounter.setCurrentNumber(player.gameWins);
    roundCounter.setCurrentNumber(player.roundWins);
    setCurrentGameState(newScene);
  };

  useEffect(() => {
    render(availableScenes[gameState]);
  }, [player, opponent, gameState]);

  const determineWinner = (chosenHand) => {
    const opponentHand = Object.keys(availableHands)[
      Math.floor(Math.random() * Object.keys(availableHands).length)
    ];
    player.setCurrentHandState(chosenHand);
    opponent.setCurrentHandState(opponentHand);
    if (availableHands[chosenHand].beats === opponentHand) {
      player.setRoundWins(player.roundWins + 1);
      changeScene('win');
      return;
    }
    if (availableHands[opponentHand].beats === chosenHand) {
      changeScene('lose');
      return;
    }
    if (opponentHand === chosenHand) {
      changeScene('draw');
    }
  };

  return (
    <GameArea>
      <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      {(() => {
        switch (gameState) {
          case 'start':
            return (
              <GamePlayButton onClick={() => changeScene('play')}>
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
