import useCompetitor from '../hooks/use-competitor';

import playerHandRockImg from '../assets/hand-player-rock.png';
import playerHandPaperImg from '../assets/hand-player-paper.png';
import playerHandScissorsImg from '../assets/hand-player-scissors.png';
import opponentHandRockImg from '../assets/hand-opponent-rock.png';
import opponentHandPaperImg from '../assets/hand-opponent-paper.png';
import opponentHandScissorsImg from '../assets/hand-opponent-scissors.png';

const competitors = () => {
  const player = useCompetitor(
    { x: 0, y: 0 },
    { x: 370, y: 676 },
    {
      rock: playerHandRockImg,
      paper: playerHandPaperImg,
      scissors: playerHandScissorsImg,
    },
  );

  const opponent = useCompetitor(
    { x: 800, y: 0 },
    { x: 470, y: 350 },
    {
      rock: opponentHandRockImg,
      paper: opponentHandPaperImg,
      scissors: opponentHandScissorsImg,
    },
  );

  return { player, opponent };
};

export default competitors;
