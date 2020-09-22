import Phaser from 'phaser';
import mainMenu from './main_menu';

const game = (() => {
  const config = {
    type: Phaser.Auto,
    width: 960,
    height: 480,
    pixelArt: true,
    physics: {
      defualt: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: [mainMenu],
  };

  const rpgGame = new Phaser.Game(config);

  const start = () => rpgGame;

  return { start };
})();

export default game;
