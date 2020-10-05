import Phaser from 'phaser';
import menu from './assets/images/title/Book.png';
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

class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'preLoader' });
  }

  preload() {
    this.image = this.add.image(480, 240, 'loading');

    this.load.image('menu', menu);
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
  }

  create() {
    this.scene.start('mainMenu');
  }
}

export default mainMenu;
