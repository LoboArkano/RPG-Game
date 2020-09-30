import Phaser from 'phaser';

class ui extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  create(data) {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 0.5);
    this.graphics.fillRect(1, 300, 320, 179);
    this.graphics.strokeRect(2, 300, 320, 179);
    this.graphics.fillRect(324, 300, 320, 179);
    this.graphics.strokeRect(324, 300, 320, 179);
    this.graphics.fillRect(645, 300, 315, 179);
    this.graphics.strokeRect(645, 300, 315, 179);
  }

  update() {
  }
}

export default ui;
