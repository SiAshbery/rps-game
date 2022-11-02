import useCompetitor from '../hooks/use-competitor';

// standard
import playerHandRockImg from '../assets/hand-player-rock.png';
import playerHandPaperImg from '../assets/hand-player-paper.png';
import playerHandScissorsImg from '../assets/hand-player-scissors.png';
import playerHandFlintlockImg from '../assets/hand-player-flintlock.png';
import opponentHandRockImg from '../assets/hand-opponent-rock.png';
import opponentHandPaperImg from '../assets/hand-opponent-paper.png';
import opponentHandScissorsImg from '../assets/hand-opponent-scissors.png';

import playerHandRockBlueImg from '../assets/hand-player-rock-blue.png';
import playerHandPaperBlueImg from '../assets/hand-player-paper-blue.png';
import playerHandScissorsBlueImg from '../assets/hand-player-scissors-blue.png';
import playerHandFlintlockBlueImg from '../assets/hand-player-flintlock-blue.png';

import playerHandRockRedImg from '../assets/hand-player-rock-red.png';
import playerHandPaperRedImg from '../assets/hand-player-paper-red.png';
import playerHandScissorsRedImg from '../assets/hand-player-scissors-red.png';
import playerHandFlintlockRedImg from '../assets/hand-player-flintlock-red.png';

import playerHandRockYellowImg from '../assets/hand-player-rock-yellow.png';
import playerHandPaperYellowImg from '../assets/hand-player-paper-yellow.png';
import playerHandScissorsYellowImg from '../assets/hand-player-scissors-yellow.png';
import playerHandFlintlockYellowImg from '../assets/hand-player-flintlock-yellow.png';

const competitors = () => {
  const player = useCompetitor(
    { x: 0, y: 0 },
    { x: 676, y: 676 },
    {
      green: {
        rock: playerHandRockImg,
        paper: playerHandPaperImg,
        scissors: playerHandScissorsImg,
        cheat: playerHandFlintlockImg,
      },
      blue: {
        rock: playerHandRockBlueImg,
        paper: playerHandPaperBlueImg,
        scissors: playerHandScissorsBlueImg,
        cheat: playerHandFlintlockBlueImg,
      },
      red: {
        rock: playerHandRockRedImg,
        paper: playerHandPaperRedImg,
        scissors: playerHandScissorsRedImg,
        cheat: playerHandFlintlockRedImg,
      },
      yellow: {
        rock: playerHandRockYellowImg,
        paper: playerHandPaperYellowImg,
        scissors: playerHandScissorsYellowImg,
        cheat: playerHandFlintlockYellowImg,
      },
    },
  );

  const opponent = useCompetitor(
    { x: 800, y: 0 },
    { x: 470, y: 350 },
    {
      green: {
        rock: opponentHandRockImg,
        paper: opponentHandPaperImg,
        scissors: opponentHandScissorsImg,
      },
    },
  );

  return { player, opponent };
};

export default competitors;
