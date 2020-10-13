import Phaser from 'phaser';
import menu from './assets/images/title/Book.png';
import leaderboardBG from './assets/images/title/CrossedSwords.png';
import block from './assets/images/tileset/block.png';
import door1 from './assets/images/object/Door1.png';
import outsideA2 from './assets/images/tileset/Outside_A2.png';
import outsideA3 from './assets/images/tileset/Outside_A3.png';
import outsideA5 from './assets/images/tileset/Outside_A5.png';
import outsideB from './assets/images/tileset/Outside_B.png';
import dungeonA4 from './assets/images/tileset/Dungeon_A4.png';
import dungeonA5 from './assets/images/tileset/Dungeon_A5.png';
import dungeonC from './assets/images/tileset/Dungeon_C.png';
import insideC from './assets/images/tileset/Inside_C.png';
import worldA2 from './assets/images/tileset/World_A2.png';
import worldB from './assets/images/tileset/World_B.png';
import mapDungeon from './assets/images/maps/dungeon.json';
import mapTemple from './assets/images/maps/temple.json';
import mapTown from './assets/images/maps/town.json';
import mapForest from './assets/images/maps/testMap.json';
import mapWorld from './assets/images/maps/worldMap.json';
import actor from './assets/images/characters/Protas.png';
import hornet from './assets/images/enemies/Hornet.png';
import rat from './assets/images/enemies/Rat.png';
import spider from './assets/images/enemies/Spider.png';
import werewolf from './assets/images/enemies/Werewolf.png';
import behemoth from './assets/images/enemies/Behemoth.png';
import minotaur from './assets/images/enemies/Minotaur.png';
import orc from './assets/images/enemies/Orc.png';
import mage from './assets/images/enemies/Mage.png';
import soldier from './assets/images/enemies/Soldier.png';
import assassin from './assets/images/enemies/Rogue.png';
import swordsman from './assets/images/enemies/Swordsman.png';
import ghostArmor from './assets/images/enemies/Ghost_Armor.png';
import imp from './assets/images/enemies/Imp.png';
import bat from './assets/images/enemies/Bat.png';
import general from './assets/images/enemies/General.png';

class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'preLoader' });
  }

  preload() {
    this.image = this.add.image(480, 240, 'loading');

    this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    this.load.image('menu', menu);
    this.load.image('leaderboardBG', leaderboardBG);
    this.load.image('Block', block);
    this.load.image('Door1', door1);
    this.load.image('Dungeon_A4', dungeonA4);
    this.load.image('Dungeon_A5', dungeonA5);
    this.load.image('Dungeon_C', dungeonC);
    this.load.image('Inside_C', insideC);
    this.load.image('Outside_A2', outsideA2);
    this.load.image('Outside_A3', outsideA3);
    this.load.image('Outside_A5', outsideA5);
    this.load.image('Outside_B', outsideB);
    this.load.image('World_A2', worldA2);
    this.load.image('World_B', worldB);
    this.load.tilemapTiledJSON('mapDungeon', mapDungeon);
    this.load.tilemapTiledJSON('mapForest', mapForest);
    this.load.tilemapTiledJSON('mapTemple', mapTemple);
    this.load.tilemapTiledJSON('mapTown', mapTown);
    this.load.tilemapTiledJSON('mapWorld', mapWorld);
    this.load.spritesheet('actor', actor, { frameWidth: 48, frameHeight: 48 });
    this.load.image('hornet', hornet);
    this.load.image('rat', rat);
    this.load.image('spider', spider);
    this.load.image('werewolf', werewolf);
    this.load.image('behemoth', behemoth);
    this.load.image('minotaur', minotaur);
    this.load.image('orc', orc);
    this.load.image('mage', mage);
    this.load.image('soldier', soldier);
    this.load.image('assassin', assassin);
    this.load.image('swordsman', swordsman);
    this.load.image('ghostArmor', ghostArmor);
    this.load.image('imp', imp);
    this.load.image('bat', bat);
    this.load.image('general', general);
  }

  create() {
    this.scene.start('mainMenu');
  }
}

export default mainMenu;
