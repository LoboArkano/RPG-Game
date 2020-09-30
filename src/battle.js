import Phaser from 'phaser';
import PlayerCharacter from './player';
import Enemy from './enemy';

class battle extends Phaser.Scene {
  constructor() {
    super({ key: 'battle' });
  }

  create(data) {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    // player character - warrior
    const warrior = new PlayerCharacter(this, 700, 40, 'actor', 13, 'Warrior', 100, 20);
    this.add.existing(warrior);

    // player character - mage
    const rouge = new PlayerCharacter(this, 750, 100, 'actor', 16, 'Rouge', 80, 15);
    this.add.existing(rouge);

    const hornet = new Enemy(this, 100, 40, 'hornet', null, 'Hornet', 50, 3);
    this.add.existing(hornet);

    const spider = new Enemy(this, 150, 100, 'spider', null, 'Spider', 50, 3);
    this.add.existing(spider);

    // array with heroes
    this.heroes = [warrior, rouge];
    // array with enemies
    this.enemies = [hornet, spider];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.scene.launch('ui');
  }

  update() {
  }
}

export default battle;
