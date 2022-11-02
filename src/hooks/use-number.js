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

  const drawMultiple = (context) => {
    const digits = currentNumber.toString().split('').map(Number);
    digits.forEach((digit, i) => {
      // eslint-disable-next-line no-undef
      const image = new Image();
      image.onload = () => {
        context.drawImage(
          image,
          position.x + i * 42,
          position.y,
          scale.x,
          scale.y,
        );
      };
      image.src = numberSprites[digit];
    });
  };

  const draw = (context) => {
    drawMultiple(context);
  };

  return {
    gameObject,
    draw,
    currentNumber,
    setCurrentNumber,
  };
}
