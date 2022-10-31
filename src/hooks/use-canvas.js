import { useRef, useEffect, useState } from 'react';

export const canvasWidth = 1280;
export const canvasHeight = 720;

export default function useCanvas(initialGameObjects) {
  const canvasRef = useRef(null);
  const [gameObjects, setGameObjects] = useState(initialGameObjects);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const context = canvasObj.getContext('2d');

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    gameObjects.forEach((gameObject) => {
      gameObject.draw(context);
    });
  }, [gameObjects]);

  return [setGameObjects, canvasRef, canvasWidth, canvasHeight];
}
