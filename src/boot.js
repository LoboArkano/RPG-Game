import Phaser from 'phaser';
import loading from './assets/images/system/Loading.png';

class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    this.load.image('loading', loading);
  }

  create() {
    this.scene.start('loader');
  }
}

export default mainMenu;
