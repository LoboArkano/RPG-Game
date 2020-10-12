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

    // player character - rogue
    const rogue = new PlayerCharacter(this, 800, 120, 'actor', 16, 'Rogue', 80, 15);
    this.add.existing(rogue);

    // player character - knight
    const knight = new PlayerCharacter(this, 800, 180, 'actor', 19, 'Knight', 130, 25);
    this.add.existing(knight);

    // player character - paladin
    const paladin = new PlayerCharacter(this, 750, 240, 'actor', 22, 'Paladin', 150, 22);
    this.add.existing(paladin);

    // array with heroes
    this.heroes = [warrior, rogue, knight, paladin];
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

    this.updateScore();
    // return to WorldScene and sleep current BattleScene
    this.scene.wake(this.data.values.location);
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  createEnemies() {
    let type;
    let enemies;

    switch (this.data.values.location) {
      case 'forest':
        type = Math.floor(Math.random() * 3);
        if (type === 0) {
          const hornet = new Enemy(this, 160, 90, 'hornet', null, 'Hornet', 50, 8);
          this.add.existing(hornet);
          const spider = new Enemy(this, 120, 160, 'spider', null, 'Spider', 40, 6);
          this.add.existing(spider);
          this.data.values.points = 20;

          enemies = [hornet, spider];
        } else if (type === 1) {
          const rat = new Enemy(this, 160, 70, 'rat', null, 'Rat', 45, 5);
          this.add.existing(rat);
          const rat2 = new Enemy(this, 120, 150, 'rat', null, 'Rat', 45, 5);
          this.add.existing(rat2);
          const rat3 = new Enemy(this, 160, 220, 'rat', null, 'Rat', 45, 5);
          this.add.existing(rat3);
          this.data.values.points = 30;

          enemies = [rat, rat2, rat3];
        } else {
          const werewolf = new Enemy(this, 160, 70, 'werewolf', null, 'Werewolf', 85, 25);
          this.add.existing(werewolf);
          const werewolf2 = new Enemy(this, 120, 170, 'werewolf', null, 'Werewolf', 85, 25);
          this.add.existing(werewolf2);
          this.data.values.points = 40;

          enemies = [werewolf, werewolf2];
        }
        break;
      case 'world':
        type = Math.floor(Math.random() * 3);
        if (type === 0) {
          const behemoth = new Enemy(this, 120, 120, 'behemoth', null, 'Behemoth', 150, 40);
          this.add.existing(behemoth);
          this.data.values.points = 50;

          enemies = [behemoth];
        } else if (type === 1) {
          const minotaur = new Enemy(this, 160, 170, 'minotaur', null, 'Minotaur', 175, 50);
          this.add.existing(minotaur);
          this.data.values.points = 55;

          enemies = [minotaur];
        } else {
          const orc = new Enemy(this, 160, 120, 'orc', null, 'Orc', 85, 35);
          this.add.existing(orc);
          this.data.values.points = 45;

          enemies = [orc];
        }
        break;
      case 'town':
        type = Math.floor(Math.random() * 4);
        if (type === 0) {
          const assassin = new Enemy(this, 160, 100, 'assassin', null, 'Assassin', 80, 25);
          this.add.existing(assassin);
          const soldier = new Enemy(this, 120, 150, 'soldier', null, 'Soldier', 130, 35);
          this.add.existing(soldier);
          const assassin2 = new Enemy(this, 160, 200, 'assassin', null, 'Assassin', 80, 25);
          this.add.existing(assassin2);
          this.data.values.points = 60;

          enemies = [assassin, soldier, assassin2];
        } else if (type === 1) {
          const soldier = new Enemy(this, 160, 100, 'soldier', null, 'Soldier', 130, 35);
          this.add.existing(soldier);
          const swordsman = new Enemy(this, 120, 150, 'swordsman', null, 'Swordsman', 100, 40);
          this.add.existing(swordsman);
          const mage = new Enemy(this, 160, 200, 'mage', null, 'Mage', 70, 70);
          this.add.existing(mage);
          this.data.values.points = 70;

          enemies = [soldier, swordsman, mage];
        } else if (type === 2) {
          const swordsman = new Enemy(this, 160, 125, 'swordsman', null, 'Swordsman', 100, 40);
          this.add.existing(swordsman);
          const mage = new Enemy(this, 160, 175, 'mage', null, 'Mage', 70, 70);
          this.add.existing(mage);
          this.data.values.points = 45;

          enemies = [swordsman, mage];
        } else {
          const mage = new Enemy(this, 160, 100, 'mage', null, 'Mage', 70, 70);
          this.add.existing(mage);
          const mage2 = new Enemy(this, 120, 150, 'mage', null, 'Mage', 70, 70);
          this.add.existing(mage2);
          const mage3 = new Enemy(this, 160, 200, 'mage', null, 'Mage', 70, 70);
          this.add.existing(mage3);
          this.data.values.points = 80;

          enemies = [mage, mage2, mage3];
        }
        break;
      case 'temple':
        type = Math.floor(Math.random() * 3);
        if (type === 0) {
          const assassin = new Enemy(this, 160, 100, 'assassin', null, 'Assassin', 80, 30);
          this.add.existing(assassin);
          const soldier = new Enemy(this, 120, 150, 'soldier', null, 'Soldier', 130, 40);
          this.add.existing(soldier);
          const assassin2 = new Enemy(this, 160, 200, 'assassin', null, 'Assassin', 80, 30);
          this.add.existing(assassin2);
          this.data.values.points = 80;

          enemies = [assassin, soldier, assassin2];
        } else if (type === 1) {
          const soldier = new Enemy(this, 160, 100, 'soldier', null, 'Soldier', 130, 40);
          this.add.existing(soldier);
          const swordsman = new Enemy(this, 120, 150, 'swordsman', null, 'Swordsman', 100, 45);
          this.add.existing(swordsman);
          const mage = new Enemy(this, 160, 200, 'mage', null, 'Mage', 70, 80);
          this.add.existing(mage);
          this.data.values.points = 90;

          enemies = [soldier, swordsman, mage];
        } else {
          const mage = new Enemy(this, 160, 100, 'mage', null, 'Mage', 70, 80);
          this.add.existing(mage);
          const mage2 = new Enemy(this, 120, 150, 'mage', null, 'Mage', 70, 80);
          this.add.existing(mage2);
          const mage3 = new Enemy(this, 160, 200, 'mage', null, 'Mage', 70, 80);
          this.add.existing(mage3);
          this.data.values.points = 100;

          enemies = [mage, mage2, mage3];
        }
        break;
      case 'dungeon':
        type = Math.floor(Math.random() * 10);
        if (type <= 4) {
          const bat = new Enemy(this, 160, 100, 'bat', null, 'Bat', 70, 20);
          this.add.existing(bat);
          const imp = new Enemy(this, 120, 150, 'imp', null, 'Imp', 100, 55);
          this.add.existing(imp);
          const bat2 = new Enemy(this, 160, 200, 'bat', null, 'Bat', 70, 20);
          this.add.existing(bat2);
          this.data.values.points = 50;

          enemies = [bat, imp, bat2];
        } else if (type <= 6) {
          const ghostArmor = new Enemy(this, 160, 150, 'ghostArmor', null, 'Ghost Armor', 200, 55);
          this.add.existing(ghostArmor);
          this.data.values.points = 400;

          enemies = [ghostArmor];
        } else if (type <= 8) {
          const general = new Enemy(this, 160, 150, 'general', null, 'General', 250, 60);
          this.add.existing(general);
          this.data.values.points = 500;

          enemies = [general];
        } else {
          const ghostArmor = new Enemy(this, 250, 150, 'ghostArmor', null, 'Ghost Armor', 200, 55);
          this.add.existing(ghostArmor);
          const general = new Enemy(this, 160, 150, 'general', null, 'General', 250, 60);
          this.add.existing(general);
          this.data.values.points = 1000;

          enemies = [ghostArmor, general];
        }
        break;
      default:
    }

    return enemies;
  }

  updateScore() {
    let score = JSON.parse(localStorage.getItem('score'));

    score += this.data.values.points;
    localStorage.setItem('score', JSON.stringify(score));
  }
}

export default battle;
