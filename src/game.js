import Phaser from 'phaser';
import boot from './boot';
import preLoader from './pre_loader';
import mainMenu from './main_menu';
import dungeon from './dungeon';
import forest from './forest';
import temple from './temple';
import town from './town';
import world from './world';
import finalScore from './final_score';
import controls from './controls';
import leaderboard from './leaderboard';

const game = (() => {
  const config = {
    type: Phaser.Auto,
    parent: 'content',
    width: 960,
    height: 480,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    dom: {
      createContainer: true,
    },
    scene: [
      boot, preLoader, mainMenu, dungeon,
      forest, town, temple, world, finalScore,
      leaderboard, controls,
    ],
  };

  const rpgGame = new Phaser.Game(config);

  const start = () => rpgGame;

  return { start };
})();

export default game;
