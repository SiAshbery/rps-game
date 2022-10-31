import { useState } from 'react';
import useGameObject from './use-game-object';
import CONSTANTS from '../constants';

export default function useCompetitor(position, scale, availableHandSprites) {
  const [currentHandState, setCurrentHandState] = useState(
    CONSTANTS.defaultHandState,
  );
  const gameObject = useGameObject(
    position,
    scale,
    availableHandSprites[currentHandState],
  );

  const setHandState = (newState) => {
    setCurrentHandState(newState);
  };

  const draw = (context) => {
    gameObject.draw(context, availableHandSprites[currentHandState]);
  };

  return {
    setCurrentHandState,
    gameObject,
    draw,
    setHandState,
  };
}
