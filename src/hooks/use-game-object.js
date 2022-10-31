import { useState } from 'react';
// import playerHandRockImg from '../assets/hand-opponent-rock.png';

export default function useGameObject(
  initialPosition,
  initialScale,
  initialSprite,
) {
  const [position, setPosition] = useState(initialPosition);
  const [scale, setScale] = useState(initialScale);
  const [sprite, setSprite] = useState(initialSprite);

  const draw = (context) => {
    const image = new Image();
    image.onload = () => {
      context.drawImage(image, position.x, position.y, scale.x, scale.y);
    };
    image.src = sprite;
  };

  return {
    position,
    setPosition,
    scale,
    setScale,
    sprite,
    setSprite,
    draw,
  };
}
