import Phaser from 'phaser';

class battle extends Phaser.Scene {
  constructor() {
    super({ key: 'battle' });
  }

  create(data) {
    this.scene.launch('ui');

    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
  }

  update() {
  }
}

export default battle;
