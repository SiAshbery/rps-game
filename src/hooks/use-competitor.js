import { useState } from 'react';
import useGameObject from './use-game-object';
import { defaultHandState } from '../constants';

export default function useCompetitor(position, scale, availableHandSprites) {
  const [currentHandState, setCurrentHandState] = useState(
    defaultHandState,
  );
  const [roundWins, setRoundWins] = useState(0);
  const [gameWins, setGameWins] = useState(0);

  const gameObject = useGameObject(
    position,
    scale,
    availableHandSprites[currentHandState],
  );

  const draw = (context) => {
    gameObject.draw(context, availableHandSprites[currentHandState]);
  };

  return {
    setCurrentHandState,
    gameObject,
    draw,
    roundWins,
    setRoundWins,
    gameWins,
    setGameWins,
  };
}
