import Phaser from 'phaser';
import PlayerCharacter from './player';
import Enemy from './enemy';

class battle extends Phaser.Scene {
  constructor() {
    super({ key: 'battle' });
  }

  create(data) {
    this.data = data;

    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);
  }

  startBattle() {
    // player character - warrior
    const warrior = new PlayerCharacter(this, 750, 60, 'actor', 13, 'Warrior', 100, 20);
    this.add.existing(warrior);

    // player character - rouge
    const rouge = new PlayerCharacter(this, 800, 120, 'actor', 16, 'Rouge', 80, 15);
    this.add.existing(rouge);

    // player character - knight
    const knight = new PlayerCharacter(this, 800, 180, 'actor', 19, 'Knight', 130, 25);
    this.add.existing(knight);

    // player character - paladin
    const paladin = new PlayerCharacter(this, 750, 240, 'actor', 22, 'Paladin', 150, 22);
    this.add.existing(paladin);

    // array with heroes
    this.heroes = [warrior, rouge, knight, paladin];
    // array with enemies
    this.enemies = this.createEnemies();
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1; // currently active unit
    this.scene.launch('ui');
  }

  nextTurn() {
    let rand;

    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      this.index += 1;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);

    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else { // else if its enemy unit
      // pick random hero
      rand = Math.floor(Math.random() * this.heroes.length);
      // call the enemy"s attack function
      this.units[this.index].attack(this.heroes[rand]);
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  }

  checkEndBattle() {
    let victory = true;
    let gameOver = true;

    // if all enemies are dead we have victory
    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) victory = false;
    }
    // if all heroes are dead we have game over
    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) gameOver = false;
    }
    return victory || gameOver;
  }

  endBattle() {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i += 1) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.stop('ui');
    this.scene.stop('battle');
    this.scene.remove('ui');
    this.scene.remove('battle');
    // return to WorldScene and sleep current BattleScene
    this.scene.wake(this.data.values.location);
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  exitBattle() {
    this.scene.sleep('ui');
    this.scene.switch(this.data.values.location);
  }

  wake() {
    this.scene.launch('ui');
    this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
  }

  createEnemies() {
    let type;
    let enemies;

    switch (this.data.values.location) {
      case 'forest':
        type = Math.floor(Math.random() * 3);
        if (type === 0) {
          const hornet = new Enemy(this, 160, 70, 'hornet', null, 'Hornet', 50, 8);
          this.add.existing(hornet);
          const spider = new Enemy(this, 150, 140, 'spider', null, 'Spider', 40, 6);
          this.add.existing(spider);

          enemies = [hornet, spider];
        } else if (type === 1) {
          const rat = new Enemy(this, 160, 70, 'rat', null, 'Rat', 45, 5);
          this.add.existing(rat);
          const rat2 = new Enemy(this, 150, 140, 'rat', null, 'Rat', 45, 5);
          this.add.existing(rat2);
          const rat3 = new Enemy(this, 160, 210, 'rat', null, 'Rat', 45, 5);
          this.add.existing(rat3);

          enemies = [rat, rat2, rat3];
        } else {
          const werewolf = new Enemy(this, 160, 70, 'werewolf', null, 'Werewolf', 85, 25);
          this.add.existing(werewolf);
          const werewolf2 = new Enemy(this, 160, 140, 'werewolf', null, 'Werewolf', 85, 25);
          this.add.existing(werewolf2);

          enemies = [werewolf, werewolf2];
        }
        break;
      case 'world':
        type = Math.floor(Math.random() * 3);
        if (type === 0) {
          const behemoth = new Enemy(this, 160, 150, 'behemoth', null, 'Behemoth', 150, 40);
          this.add.existing(behemoth);

          enemies = [behemoth];
        } else if (type === 1) {
          const minotaur = new Enemy(this, 160, 150, 'minotaur', null, 'Minotaur', 175, 50);
          this.add.existing(minotaur);

          enemies = [minotaur];
        } else {
          const orc = new Enemy(this, 160, 70, 'orc', null, 'Orc', 85, 25);
          this.add.existing(orc);

          enemies = [orc];
        }
        break;
      default:
    }

    return enemies;
  }
}

export default battle;
