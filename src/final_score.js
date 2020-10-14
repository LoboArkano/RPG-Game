import Phaser from 'phaser';
import leaderboardAPI from './leaderboardAPI';

class finalScore extends Phaser.Scene {
  constructor() {
    super({ key: 'finalScore' });
  }

  create(data) {
    this.score = JSON.parse(localStorage.getItem('score'));
    this.inputText = this.add.rexInputText(315, 300, 150, 35, {
      type: 'text',
      placeholder: 'USERNAME',
      fontSize: '20px',
      background: '#ffffff',
      color: '#000000',
      paddingLeft: '4px',
      paddingTop: '3px',
    });
    this.startBtn = this.add.text(410, 287, 'SUBMIT', { fontSize: '25px', fill: '#fff' });
    this.startBtn.setInteractive()
      .on('pointerdown', () => this.submitScore());

    this.add.text(240, 50, 'THANKS FOR PLAYING', { fontSize: '35px', fill: '#fff' });
    this.add.text(240, 100, `FINAL SCORE: ${this.score}`, { fontSize: '30px', fill: '#fff' });
    // Remove keys from the last scene
    this.lastScene = this.scene.get(data.values.location);
    this.lastScene.input.keyboard.removeCapture('W,S,A,D');
  }

  submitScore() {
    this.inputText.text = this.inputText.text.trim();
    if (this.data.values.text !== '') {
      leaderboardAPI.postScore({ user: this.inputText.text, score: this.score });
      this.scene.start('mainMenu');
    }
  }
}

export default finalScore;
