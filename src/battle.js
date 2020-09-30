import Phaser from 'phaser';

class battle extends Phaser.Scene {
  constructor() {
    super({ key: 'battle' });
  }

  create(data) {
    this.scene.launch('ui');
  }

  update() {
  }
}

export default battle;
