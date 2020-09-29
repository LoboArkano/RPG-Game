import Phaser from 'phaser';

class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'mainMenu' });
  }

  create() {
    this.image = this.add.image(480, 240, 'menu');
    this.title = this.add.text(400, 100, 'RPG GAME', { fontSize: '42px', fill: '#fff' });
    this.startBtn = this.add.text(400, 300, 'START', { fontSize: '30px', fill: '#fff' });
    const controlls = this.add.text(400, 350, 'CONTROLLS', { fontSize: '30px', fill: '#fff' });

    this.startBtn.setInteractive()
      .on('pointerdown', () => this.startForestScene())
      .on('pointerover', () => this.startBtnHoverState())
      .on('pointerout', () => this.startBtnRestState());
  }

  startForestScene() {
    this.scene.start('forest');
  }

  startBtnHoverState() {
    this.startBtn.setStyle({ fill: '#ff0' });
  }

  startBtnRestState() {
    this.startBtn.setStyle({ fill: '#fff' });
  }
}

export default mainMenu;
