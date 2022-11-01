import { useState } from 'react';
import useGameObject from './use-game-object';
import { numberSprites } from '../constants';

export default function useNumber(position, scale) {
  const [currentNumber, setCurrentNumber] = useState(0);

  const gameObject = useGameObject(
    position,
    scale,
    numberSprites[currentNumber],
  );

  const draw = (context) => {
    gameObject.draw(context, numberSprites[currentNumber]);
  };

  return {
    gameObject,
    draw,
    currentNumber,
    setCurrentNumber,
  };
}
