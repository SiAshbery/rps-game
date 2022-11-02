import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// components
import PlayerAttackOptions from './player-attack-options';
import GameSetupOptions from './game-setup-options';
import { GamePlayButton } from './common';

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

function Game() {
  const [gameState, setCurrentGameState] = useState('start');
  const [maxGameRounds, setMaxGameRounds] = useState(3);
  const [hardMode, setHardMode] = useState(false);
  const [cheatsEnabled, setCheatsEnabled] = useState(false);

  const { player, opponent } = competitors();
  const {
    pressStartPrompt,
    youWinPrompt,
    youLosePrompt,
    drawPrompt,
    gamesWonCounter,
    gamesWonText,
    roundCounter,
    roundsWonText,
    opponentRoundCounter,
    opponentRoundsWonText,
    gamesLostCounter,
    gamesLostText,
  } = ui();

  const availableScenes = {
    start: [
      pressStartPrompt,
      gamesWonText,
      gamesWonCounter,
      gamesLostText,
      gamesLostCounter,
    ],
    gameSetUp: [
      pressStartPrompt,
      gamesWonText,
      gamesWonCounter,
      gamesLostText,
      gamesLostCounter,
    ],
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

  const [
    render,
    canvasRef,
    canvasWidth,
    canvasHeight,
    canvasFillStyle,
    setCanvasFillStyle,
  ] = useCanvas();

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
    gamesWonCounter.setCurrentNumber(player.gameWins);
    gamesLostCounter.setCurrentNumber(player.gameLosses);
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
      player.setGameLosses(player.gameLosses + 1);
      player.setRoundWins(0);
      opponent.setRoundWins(0);
      pauseBeforeSceneChange('start', 1000);
    } else {
      pauseBeforeSceneChange('play', 1000);
    }
  };

  const generateOpponentHand = (chosenHand) => {
    if (hardMode && chosenHand !== 'cheat') {
      // ░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄
      // ░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄
      // ░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█
      // ░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░█
      // ░▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░█
      // █▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒█
      // █▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█
      // ░█▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█
      // ░░█░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█
      // ░░░█░░██░░▀█▄▄▄█▄▄█▄████░█
      // ░░░░█░░░▀▀▄░█░░░█░███████░█
      // ░░░░░▀▄░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█
      // ░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░█
      // ░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░█
      // ░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░█
      return Object.keys(availableHands).find(
        (key) => availableHands[key].beats === chosenHand,
      );
    }
    return Object.keys(availableHands)[
      Math.floor(Math.random() * Object.keys(availableHands).length)
    ];
  };

  const determineRoundWinner = (chosenHand) => {
    const opponentHand = generateOpponentHand(chosenHand);
    let playerRoundsWon = player.roundWins;
    let opponentRoundsWon = opponent.roundWins;
    player.setCurrentHandState(chosenHand);
    opponent.setCurrentHandState(opponentHand);
    if (chosenHand === 'cheat' || availableHands[chosenHand].beats === opponentHand) {
      playerRoundsWon += 1;
      player.setRoundWins(playerRoundsWon);
      changeScene('win');
    } else if (availableHands[opponentHand].beats === chosenHand) {
      opponentRoundsWon += 1;
      opponent.setRoundWins(opponentRoundsWon);
      changeScene('lose');
    } else if (opponentHand === chosenHand) {
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
                maxRounds={maxGameRounds}
                changeScene={changeScene}
                setHardMode={setHardMode}
                hardMode={hardMode}
                setPlayerColor={player.setCompetitorColor}
                playerColor={player.competitorColor}
                setCheatsEnabled={setCheatsEnabled}
                cheatsEnabled={cheatsEnabled}
                canvasFillStyle={canvasFillStyle}
                setCanvasFillStyle={setCanvasFillStyle}
              />
            );
          case 'play':
            return (
              <PlayerAttackOptions
                determineRoundWinner={determineRoundWinner}
                cheatsEnabled={cheatsEnabled}
              />
            );
          default:
            return <div>please wait...</div>;
        }
      })()}
    </GameArea>
  );
}

export default Game;
