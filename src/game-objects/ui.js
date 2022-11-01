// hooks
import useNumber from '../hooks/use-number';
import useGameObject from '../hooks/use-game-object';

// images
import pressStartImg from '../assets/press-start.png';
import youWinImg from '../assets/you-win.png';
import youLoseImg from '../assets/you-lose.png';
import drawImg from '../assets/draw.png';
import gamesWonTextImg from '../assets/games-won.png';
import roundsWonTextImg from '../assets/rounds-won.png';

const ui = () => {
  const pressStartPrompt = useGameObject(
    { x: 400, y: 260 },
    { x: 512, y: 128 },
    pressStartImg,
  );
  const youWinPrompt = useGameObject(
    { x: 400, y: 260 },
    { x: 512, y: 128 },
    youWinImg,
  );
  const youLosePrompt = useGameObject(
    { x: 400, y: 260 },
    { x: 512, y: 128 },
    youLoseImg,
  );
  const drawPrompt = useGameObject(
    { x: 400, y: 260 },
    { x: 512, y: 128 },
    drawImg,
  );
  const scoreCounter = useNumber({ x: 420, y: 600 }, { x: 128, y: 128 });
  const roundCounter = useNumber({ x: 420, y: 600 }, { x: 128, y: 128 });
  const gamesWonText = useGameObject(
    { x: 0, y: 600 },
    { x: 512, y: 128 },
    gamesWonTextImg,
  );
  const roundsWonText = useGameObject(
    { x: 0, y: 600 },
    { x: 512, y: 128 },
    roundsWonTextImg,
  );

  return {
    pressStartPrompt,
    youWinPrompt,
    youLosePrompt,
    drawPrompt,
    scoreCounter,
    gamesWonText,
    roundCounter,
    roundsWonText,
  };
};

export default ui;
