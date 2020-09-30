import Phaser from 'phaser';

class ui extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  create(data) {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 300, 320, 179);
    this.graphics.fillRect(2, 300, 320, 179);
    this.graphics.strokeRect(324, 300, 320, 179);
    this.graphics.fillRect(324, 300, 320, 179);
    this.graphics.strokeRect(630, 300, 330, 179);
    this.graphics.fillRect(630, 300, 330, 179);
  }

  update() {
  }
}

export default ui;
