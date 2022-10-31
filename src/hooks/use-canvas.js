import { useRef } from 'react';

export const canvasWidth = 1280;
export const canvasHeight = 720;

export default function useCanvas(gameObjects) {
  const canvasRef = useRef(null);

  const render = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    gameObjects.forEach((gameObject) => {
      gameObject.draw(context);
    });
  };

  return [render, canvasRef, canvasWidth, canvasHeight];
}
