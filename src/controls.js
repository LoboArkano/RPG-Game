import Phaser from 'phaser';

class controls extends Phaser.Scene {
  constructor() {
    super({ key: 'controls' });
  }

  create() {
    const textStyle = { fontSize: '23px', fill: '#fff' };

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 0.8);
    this.graphics.fillRect(230, 45, 450, 45);
    this.graphics.strokeRect(231, 45, 450, 45);
    this.graphics.fillRect(230, 95, 450, 305);
    this.graphics.strokeRect(231, 96, 450, 305);

    this.add.text(240, 50, 'HOW TO PLAY', { fontSize: '30px', fill: '#fff' });
    this.controlsBtn = this.add.text(780, 400, '< BACK', { fontSize: '25px', fill: '#fff' });
    this.controlsBtn.setInteractive()
      .on('pointerdown', () => this.startMainMenuScene());

    this.add.text(240, 110, 'EXPLORE MODE', textStyle);
    this.add.text(240, 160, 'MOVE: A, S, D, W', textStyle);
    this.add.text(240, 230, 'BATTLE MODE', textStyle);
    this.add.text(240, 280, 'SELECT: ARROW KEYS', textStyle);
    this.add.text(240, 330, 'ACTION: SPACE', textStyle);

    this.music = this.sound.add('Ship1', { volumen: 0.8, loop: true });
    this.music.play();
  }

  startMainMenuScene() {
    this.music.stop();
    this.scene.start('mainMenu');
  }
}

export default controls;
