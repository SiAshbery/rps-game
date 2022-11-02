import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  GamePlayButton,
  GamePlayButtonContainer,
  OptionHeader,
} from './common';
import { availableColors } from '../constants';

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

const ColorPreview = styled.div`
  height: 50px;
  width: 50px;
  background: ${(props) => props.color};
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
  canvasFillStyle,
  setCanvasFillStyle,
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
              <GamePlayButton
                color={availableColors.green}
                onClick={() => setPlayerColor('green')}
              >
                Green
              </GamePlayButton>
              <GamePlayButton
                color={availableColors.blue}
                onClick={() => setPlayerColor('blue')}
              >
                Blue
              </GamePlayButton>
              <GamePlayButton
                color={availableColors.red}
                onClick={() => setPlayerColor('red')}
              >
                Red
              </GamePlayButton>
              <GamePlayButton
                color={availableColors.yellow}
                onClick={() => setPlayerColor('yellow')}
              >
                Yellow
              </GamePlayButton>
            </li>
            <li>
              <GamePlayButton onClick={() => setCheatsEnabled(!cheatsEnabled)}>
                Enabled Cheats
              </GamePlayButton>
            </li>
            <li>
              <OptionHeader>BackgroundColor?</OptionHeader>
              <GamePlayButton
                color={availableColors.green}
                onClick={() => setCanvasFillStyle(availableColors.green)}
              >
                Green
              </GamePlayButton>
              <GamePlayButton
                color={availableColors.blue}
                onClick={() => setCanvasFillStyle(availableColors.blue)}
              >
                Blue
              </GamePlayButton>
              <GamePlayButton
                color={availableColors.red}
                onClick={() => setCanvasFillStyle(availableColors.red)}
              >
                Red
              </GamePlayButton>
              <GamePlayButton
                color={availableColors.yellow}
                onClick={() => setCanvasFillStyle(availableColors.yellow)}
              >
                Yellow
              </GamePlayButton>
              <GamePlayButton
                color="#656565"
                onClick={() => setCanvasFillStyle(availableColors.black)}
              >
                Black
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
            <ColorPreview color={availableColors[playerColor]} />
          </li>
          <li>
            Cheats enabled?:
            {cheatsEnabled ? 'Yes' : 'No'}
          </li>
          <li>
            BackgroundColor?:
            <ColorPreview color={canvasFillStyle} />
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
  canvasFillStyle: PropTypes.string.isRequired,
  setCanvasFillStyle: PropTypes.func.isRequired,
};
