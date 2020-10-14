import Phaser from 'phaser';

class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'mainMenu' });
  }

  create() {
    this.textStyle = { fontSize: '30px', fill: '#fff' };
    this.image = this.add.image(480, 240, 'menu');
    this.title = this.add.text(400, 100, 'RPG GAME', this.textStyle);
    this.startBtn = this.add.text(400, 280, 'START', this.textStyle);
    this.controllsBtn = this.add.text(400, 330, 'CONTROLLS', this.textStyle);
    this.leaderboardBtn = this.add.text(400, 380, 'LEADERBOARD', this.textStyle);

    this.startBtn.setInteractive()
      .on('pointerdown', () => this.startForestScene())
      .on('pointerover', () => this.startBtnHoverState())
      .on('pointerout', () => this.startBtnRestState());

    this.controllsBtn.setInteractive()
      .on('pointerdown', () => this.startControllsScene());

    this.leaderboardBtn.setInteractive()
      .on('pointerdown', () => this.startLeaderboardScene());
  }

  startForestScene() {
    localStorage.clear();
    localStorage.setItem('score', JSON.stringify(10));
    this.scene.start('forest', this.data);
  }

  startControllsScene() {
    this.scene.start('controlls');
  }

  startLeaderboardScene() {
    this.scene.start('leaderboard');
  }

  startBtnHoverState() {
    this.startBtn.setStyle({ fill: '#ff0' });
  }

  startBtnRestState() {
    this.startBtn.setStyle({ fill: '#fff' });
  }
}

export default mainMenu;
