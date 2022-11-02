import { useRef, useState } from 'react';
import shadeColor from '../util';

export const canvasWidth = 1280;
export const canvasHeight = 720;

export default function useCanvas() {
  const [canvasFillStyle, setCanvasFillStyle] = useState('#000000');
  const canvasRef = useRef(null);

  const render = (scene) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = canvasFillStyle;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.fillStyle = shadeColor(canvasFillStyle, 20);
    context.ellipse(720, 700, 1000, 300, 0, 3, 0);
    context.fill();

    scene.forEach((gameObject) => {
      gameObject.draw(context);
    });
  };

  return [render, canvasRef, canvasWidth, canvasHeight, canvasFillStyle, setCanvasFillStyle];
}
