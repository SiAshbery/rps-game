import { useState } from 'react';

export default function useGameObject(
  initialPosition,
  initialScale,
  initialSprite,
) {
  const [position, setPosition] = useState(initialPosition);
  const [scale, setScale] = useState(initialScale);

  const draw = (context, newSprite = null) => {
    // eslint-disable-next-line no-undef
    const image = new Image();
    image.onload = () => {
      context.drawImage(image, position.x, position.y, scale.x, scale.y);
    };
    image.src = newSprite || initialSprite;
  };

  return {
    position,
    setPosition,
    scale,
    setScale,
    draw,
  };
}
