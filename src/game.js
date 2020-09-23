import Phaser from 'phaser';
import mainMenu from './main_menu';
import forest from './forest';

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
      },
    },
    scene: [mainMenu, forest],
  };

  const rpgGame = new Phaser.Game(config);

  const start = () => rpgGame;

  return { start };
})();

export default game;
