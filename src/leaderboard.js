import Phaser from 'phaser';
import leaderboardAPI from './leaderboardAPI';

class leaderboard extends Phaser.Scene {
  constructor() {
    super({ key: 'leaderboard' });
  }

  create() {
    this.image = this.add.image(480, 240, 'leaderboardBG');
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 0.8);
    this.graphics.fillRect(330, 45, 300, 45);
    this.graphics.strokeRect(331, 45, 300, 45);
    this.graphics.fillRect(330, 95, 300, 305);
    this.graphics.strokeRect(331, 96, 300, 305);
    this.add.text(340, 50, 'LEADERBOARD', { fontSize: '30px', fill: '#fff' });
    this.leaderboardBtn = this.add.text(780, 400, '< BACK', { fontSize: '25px', fill: '#fff' });
    this.leaderboardBtn.setInteractive()
      .on('pointerdown', () => this.startMainMenuScene());

    leaderboardAPI.getScore().then(scores => {
      let y = 105;

      scores.sort((a, b) => (b.score - a.score)).slice(0, 10);

      scores.forEach((score, index) => {
        this.add.text(
          340,
          y,
          `${index + 1}   ${score.user}   ${score.score}`,
          { fontSize: '20px', fill: '#fff' },
        );
        y += 30;
      });
    });
  }

  startMainMenuScene() {
    this.scene.start('mainMenu');
  }
}

export default leaderboard;
