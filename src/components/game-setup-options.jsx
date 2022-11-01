import React from 'react';
import PropTypes from 'prop-types';
import {
  GamePlayButton,
  GamePlayButtonContainer,
  OptionHeader,
} from './common';

export default function GameSetupOptions({ setMaxGameRounds, changeScene }) {
  return (
    <>
      <GamePlayButton onClick={() => changeScene('play')}>Let&apos;s go!</GamePlayButton>
      <GamePlayButtonContainer>
        <OptionHeader>How many rounds do you want to play?</OptionHeader>
        <GamePlayButton onClick={() => setMaxGameRounds(3)}>3</GamePlayButton>
        <GamePlayButton onClick={() => setMaxGameRounds(5)}>5</GamePlayButton>
        <GamePlayButton onClick={() => setMaxGameRounds(7)}>7</GamePlayButton>
      </GamePlayButtonContainer>
    </>
  );
}

GameSetupOptions.propTypes = {
  setMaxGameRounds: PropTypes.func.isRequired,
  changeScene: PropTypes.func.isRequired,
};
