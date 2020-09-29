import Phaser from 'phaser';
import boot from './boot';
import preLoader from './pre_loader';
import mainMenu from './main_menu';
import forest from './forest';
import world from './world';

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
        debug: true,
      },
    },
    scene: [boot, preLoader, mainMenu, forest, world],
  };

  const rpgGame = new Phaser.Game(config);

  const start = () => rpgGame;

  return { start };
})();

export default game;
