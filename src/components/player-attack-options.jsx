import React from 'react';
import PropTypes from 'prop-types';
import { GamePlayButton, GamePlayButtonContainer } from './common';

export default function PlayerAttackOptions({ determineRoundWinner }) {
  return (
    <GamePlayButtonContainer>
      <GamePlayButton onClick={() => determineRoundWinner('rock')}>
        Select Rock
      </GamePlayButton>
      <GamePlayButton onClick={() => determineRoundWinner('paper')}>
        Select Paper
      </GamePlayButton>
      <GamePlayButton onClick={() => determineRoundWinner('scissors')}>
        Select Scissors
      </GamePlayButton>
    </GamePlayButtonContainer>
  );
}

PlayerAttackOptions.propTypes = {
  determineRoundWinner: PropTypes.func.isRequired,
};
