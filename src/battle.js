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

    this.index = -1;

    const timeEvent = this.time.addEvent({
      delay: 2000, callback: this.exitBattle, callbackScope: this,
    });

    this.sys.events.on('wake', this.wake, this);
  }

  nextTurn() {
    this.index += 1;
    // if there are no more units, we start again from the first one
    if (this.index >= this.units.length) {
      this.index = 0;
    }
    if (this.units[this.index]) {
      // if its player hero
      if (this.units[this.index] instanceof PlayerCharacter) {
        this.events.emit('PlayerSelect', this.index);
      } else { // else if its enemy unit
        // pick random hero
        const r = Math.floor(Math.random() * this.heroes.length);
        // call the enemy's attack function
        this.units[this.index].attack(this.heroes[r]);
        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    }
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  exitBattle() {
    this.scene.sleep('ui');
    this.scene.switch('forest');
  }

  wake() {
    this.scene.launch('ui');
    this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
  }

  update() {
  }
}

export default battle;
