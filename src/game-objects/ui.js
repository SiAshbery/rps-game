// hooks
import useNumber from '../hooks/use-number';
import useGameObject from '../hooks/use-game-object';

// images
import pressStartImg from '../assets/press-start.png';
import youWinImg from '../assets/you-win.png';
import youLoseImg from '../assets/you-lose.png';
import drawImg from '../assets/draw.png';
import gamesWonTextImg from '../assets/games-won.png';
import gamesLostTextImg from '../assets/games-lost.png';
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
  const gamesWonCounter = useNumber({ x: 410, y: 520 }, { x: 128, y: 128 });
  const gamesLostCounter = useNumber({ x: 440, y: 600 }, { x: 128, y: 128 });
  const roundCounter = useNumber({ x: 1100, y: 600 }, { x: 128, y: 128 });
  const opponentRoundCounter = useNumber({ x: 460, y: 0 }, { x: 128, y: 128 });
  const gamesWonText = useGameObject(
    { x: -18, y: 520 },
    { x: 512, y: 128 },
    gamesWonTextImg,
  );
  const gamesLostText = useGameObject(
    { x: 0, y: 600 },
    { x: 512, y: 128 },
    gamesLostTextImg,
  );
  const roundsWonText = useGameObject(
    { x: 640, y: 600 },
    { x: 512, y: 128 },
    roundsWonTextImg,
  );
  const opponentRoundsWonText = useGameObject(
    { x: 0, y: 0 },
    { x: 512, y: 128 },
    roundsWonTextImg,
  );

  return {
    pressStartPrompt,
    youWinPrompt,
    youLosePrompt,
    drawPrompt,
    gamesWonCounter,
    gamesWonText,
    roundCounter,
    roundsWonText,
    opponentRoundCounter,
    opponentRoundsWonText,
    gamesLostText,
    gamesLostCounter,
  };
};

export default ui;
