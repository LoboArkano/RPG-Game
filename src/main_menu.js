import Phaser from 'phaser';
import book from './assets/images/title/Book.png';

class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'mainMenu' });
  }

  preload() {
    this.load.image('mainMenu', book);
  }

  create() {
    this.image = this.add.image(480, 240, 'mainMenu');
    this.title = this.add.text(400, 100, 'RPG GAME', { fontSize: '42px', fill: '#fff' });
    this.start = this.add.text(400, 300, 'START', { fontSize: '30px', fill: '#fff' });
    this.controlls = this.add.text(400, 350, 'CONTROLLS', { fontSize: '30px', fill: '#fff' });
  }
}

export default mainMenu;
