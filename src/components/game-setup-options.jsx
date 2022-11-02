import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  GamePlayButton,
  GamePlayButtonContainer,
  OptionHeader,
} from './common';

const ConfigReadout = styled.ul`
  color: #ffffff;

  li {
    list-style: none;
    margin: 12px;
  }
`;

const Options = styled.ul`
  padding: 0;
  li {
    display: flex;
    list-style: none;
    margin: 12px;
  }
`;

const SetupContainer = styled.div`
  display: flex;
`;

export default function GameSetupOptions({
  setMaxGameRounds,
  maxRounds,
  changeScene,
  setHardMode,
  hardMode,
  setPlayerColor,
  playerColor,
  setCheatsEnabled,
  cheatsEnabled,
}) {
  return (
    <>
      <GamePlayButton onClick={() => changeScene('play')}>
        Let&apos;s go!
      </GamePlayButton>
      <SetupContainer>
        <GamePlayButtonContainer>
          <Options>
            <li>
              <OptionHeader>How many rounds do you want to play?</OptionHeader>
              <GamePlayButton onClick={() => setMaxGameRounds(3)}>
                3
              </GamePlayButton>
              <GamePlayButton onClick={() => setMaxGameRounds(5)}>
                5
              </GamePlayButton>
              <GamePlayButton onClick={() => setMaxGameRounds(7)}>
                7
              </GamePlayButton>
            </li>
            <li>
              <OptionHeader>Difficulty?</OptionHeader>
              <GamePlayButton onClick={() => setHardMode(false)}>
                Standard
              </GamePlayButton>
              <GamePlayButton onClick={() => setHardMode(true)}>
                Hard
              </GamePlayButton>
            </li>
            <li>
              <OptionHeader>Player color?</OptionHeader>
              <GamePlayButton onClick={() => setPlayerColor('green')}>
                Green
              </GamePlayButton>
              <GamePlayButton onClick={() => setPlayerColor('blue')}>
                Blue
              </GamePlayButton>
              <GamePlayButton onClick={() => setPlayerColor('red')}>
                Red
              </GamePlayButton>
              <GamePlayButton onClick={() => setPlayerColor('yellow')}>
                Yellow
              </GamePlayButton>
            </li>
            <li>
              <GamePlayButton onClick={() => setCheatsEnabled(!cheatsEnabled)}>
                Enabled Cheats
              </GamePlayButton>
            </li>
          </Options>
        </GamePlayButtonContainer>
        <ConfigReadout>
          <li>
            Best of:
            {' '}
            {maxRounds}
          </li>
          <li>
            Difficulty:
            {(hardMode && 'Hard') || 'Normal'}
          </li>
          <li>
            Player color:
            {playerColor}
          </li>
          <li>
            Cheats enabled?:
            {cheatsEnabled ? 'Yes' : 'No'}
          </li>
        </ConfigReadout>
      </SetupContainer>
    </>
  );
}

GameSetupOptions.propTypes = {
  setMaxGameRounds: PropTypes.func.isRequired,
  setHardMode: PropTypes.func.isRequired,
  hardMode: PropTypes.bool.isRequired,
  changeScene: PropTypes.func.isRequired,
  maxRounds: PropTypes.number.isRequired,
  setPlayerColor: PropTypes.func.isRequired,
  playerColor: PropTypes.string.isRequired,
  setCheatsEnabled: PropTypes.func.isRequired,
  cheatsEnabled: PropTypes.bool.isRequired,
};
