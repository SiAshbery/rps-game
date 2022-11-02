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
    opponentRoundCounter,
    opponentRoundsWonText,
  } = ui();

  const availableScenes = {
    start: [pressStartPrompt, gamesWonText, scoreCounter],
    gameSetUp: [pressStartPrompt, gamesWonText, scoreCounter],
    play: [
      player,
      opponent,
      roundsWonText,
      roundCounter,
      opponentRoundCounter,
      opponentRoundsWonText,
    ],
    win: [
      player,
      opponent,
      roundsWonText,
      roundCounter,
      opponentRoundCounter,
      opponentRoundsWonText,
      youWinPrompt,
    ],
    lose: [
      player,
      opponent,
      roundsWonText,
      roundCounter,
      opponentRoundCounter,
      opponentRoundsWonText,
      youLosePrompt,
    ],
    draw: [
      player,
      opponent,
      roundsWonText,
      roundCounter,
      opponentRoundCounter,
      opponentRoundsWonText,
      drawPrompt,
    ],
  };

  const [render, canvasRef, canvasWidth, canvasHeight] = useCanvas();

  const changeScene = (newScene) => {
    setCurrentGameState(newScene);
  };

  const pauseBeforeSceneChange = (newScene, time) => {
    setTimeout(() => {
      changeScene(newScene);
    }, time);
  };

  useEffect(() => {
    // any changesthat trigger graphics updates need to happen in this useEffect.
    scoreCounter.setCurrentNumber(player.gameWins);
    roundCounter.setCurrentNumber(player.roundWins);
    opponentRoundCounter.setCurrentNumber(opponent.roundWins);

    render(availableScenes[gameState]);
  }, [gameState]);

  const determineGameWinner = (playerRoundsWon, opponentRoundsWon) => {
    const roundsToWin = Math.ceil(maxGameRounds / 2);
    if (playerRoundsWon === roundsToWin) {
      player.setGameWins(player.gameWins + 1);
      player.setRoundWins(0);
      opponent.setRoundWins(0);
      pauseBeforeSceneChange('start', 1000);
    } else if (opponentRoundsWon === roundsToWin) {
      player.setRoundWins(0);
      opponent.setRoundWins(0);
      pauseBeforeSceneChange('start', 1000);
    } else {
      pauseBeforeSceneChange('play', 1000);
    }
  };

  const determineRoundWinner = (chosenHand) => {
    const opponentHand = Object.keys(availableHands)[
      Math.floor(Math.random() * Object.keys(availableHands).length)
    ];
    let playerRoundsWon = player.roundWins;
    let opponentRoundsWon = opponent.roundWins;
    player.setCurrentHandState(chosenHand);
    opponent.setCurrentHandState(opponentHand);
    if (availableHands[chosenHand].beats === opponentHand) {
      playerRoundsWon += 1;
      player.setRoundWins(playerRoundsWon);
      changeScene('win');
    }
    if (availableHands[opponentHand].beats === chosenHand) {
      opponentRoundsWon += 1;
      opponent.setRoundWins(opponentRoundsWon);
      changeScene('lose');
    }
    if (opponentHand === chosenHand) {
      changeScene('draw');
    }
    determineGameWinner(playerRoundsWon, opponentRoundsWon);
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
              <GameSetupOptions
                setMaxGameRounds={setMaxGameRounds}
                changeScene={changeScene}
              />
            );
          case 'play':
            return (
              <PlayerAttackOptions
                determineRoundWinner={determineRoundWinner}
              />
            );
          default:
            return <div>please wait...</div>;
        }
      })()}
      <div>
        max rounds:
        {' '}
        {maxGameRounds}
      </div>
      <div>
        rounds to win:
        {' '}
        {Math.ceil(maxGameRounds / 2)}
      </div>
      <div>
        player wins:
        {' '}
        {player.roundWins}
      </div>
      <div>
        opponent wins:
        {' '}
        {opponent.roundWins}
      </div>
    </GameArea>
  );
}

export default Game;
