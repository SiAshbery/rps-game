import number0Img from './assets/number-0.png';
import number1Img from './assets/number-1.png';
import number2Img from './assets/number-2.png';
import number3Img from './assets/number-3.png';
import number4Img from './assets/number-4.png';
import number5Img from './assets/number-5.png';
import number6Img from './assets/number-6.png';
import number7Img from './assets/number-7.png';
import number8Img from './assets/number-8.png';
import number9Img from './assets/number-9.png';

export const defaultHandState = 'rock';
export const availableHands = {
  rock: { beats: 'scissors' },
  paper: { beats: 'rock' },
  scissors: { beats: 'paper' },
};
export const numberSprites = [
  number0Img,
  number1Img,
  number2Img,
  number3Img,
  number4Img,
  number5Img,
  number6Img,
  number7Img,
  number8Img,
  number9Img,
];

export const availableColors = {
  green: '#87ad86',
  blue: '#82acb9',
  red: '#ca97af',
  yellow: '#aba67d',
  black: '#000000',
};
