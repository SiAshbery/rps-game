import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// components
import PlayerAttackOptions from './player-attack-options';
import GameSetupOptions from './game-setup-options';

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

function Game() {
  const [gameState, setCurrentGameState] = useState('start');
  const [maxGameRounds, setMaxGameRounds] = useState(3);

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
    gameSetUp: [pressStartPrompt, gamesWonText, scoreCounter],
    play: [player, opponent, roundsWonText, roundCounter],
    win: [player, opponent, roundsWonText, roundCounter, youWinPrompt],
    lose: [player, opponent, roundsWonText, roundCounter, youLosePrompt],
    draw: [player, opponent, roundsWonText, roundCounter, drawPrompt],
  };

  const [render, canvasRef, canvasWidth, canvasHeight] = useCanvas();

  const changeScene = (newScene) => {
    setCurrentGameState(newScene);
  };

  useEffect(() => {
    // any changes to graphics need to happen in this useEffect.
    scoreCounter.setCurrentNumber(player.gameWins);
    roundCounter.setCurrentNumber(player.roundWins);
    render(availableScenes[gameState]);
  }, [gameState]);

  const determineGameWinner = () => {
    const roundsToWin = Math.ceil(maxGameRounds / 2);

    if (player.roundWins === roundsToWin) {
      player.setGameWins(player.gameWins + 1);
      player.setRoundWins(0);
      opponent.setRoundWins(0);
      changeScene('start');
    }
    if (opponent.roundWins === roundsToWin) {
      player.setRoundWins(0);
      opponent.setRoundWins(0);
      changeScene('start');
    }
  };

  const pauseBeforeResumePlay = () => {
    setTimeout(() => {
      changeScene('play');
    }, 1000);
  };

  const determineRoundWinner = (chosenHand) => {
    const opponentHand = Object.keys(availableHands)[
      Math.floor(Math.random() * Object.keys(availableHands).length)
    ];
    player.setCurrentHandState(chosenHand);
    opponent.setCurrentHandState(opponentHand);
    if (availableHands[chosenHand].beats === opponentHand) {
      player.setRoundWins(player.roundWins + 1);
      changeScene('win');
      pauseBeforeResumePlay();
    }
    if (availableHands[opponentHand].beats === chosenHand) {
      changeScene('lose');
      pauseBeforeResumePlay();
    }
    if (opponentHand === chosenHand) {
      changeScene('draw');
      pauseBeforeResumePlay();
    }
    determineGameWinner();
  };

  return (
    <GameArea>
      <Canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      {(() => {
        switch (gameState) {
          case 'start':
            return (
              <GamePlayButton onClick={() => changeScene('gameSetUp')}>
                Start New Game
              </GamePlayButton>
            );
          case 'gameSetUp':
            return (
              <GameSetupOptions setMaxGameRounds={setMaxGameRounds} changeScene={changeScene} />
            );
          case 'play':
            return (
              <PlayerAttackOptions determineRoundWinner={determineRoundWinner} />
            );
          default:
            return (
              <div>please wait...</div>
            );
        }
      })()}
    </GameArea>
  );
}

export default Game;
