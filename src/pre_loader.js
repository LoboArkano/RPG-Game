import Phaser from 'phaser';
import menu from './assets/images/title/Book.png';
import outsideA2 from './assets/images/tileset/Outside_A2.png';
import outsideB from './assets/images/tileset/Outside_B.png';
import mapForest from './assets/images/maps/testMap.json';
import worldA2 from './assets/images/tileset/World_A2.png';
import worldB from './assets/images/tileset/World_B.png';
import worldMap from './assets/images/maps/worldMap.json';
import door1 from './assets/images/object/Door1.png';
import outsideA3 from './assets/images/tileset/Outside_A3.png';
import outsideA5 from './assets/images/tileset/Outside_A5.png';
import mapTown from './assets/images/maps/town.json';
import insideC from './assets/images/tileset/Inside_C.png';
import mapTemple from './assets/images/maps/temple.json';
import actor from './assets/images/characters/Protas.png';

class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'preLoader' });
  }

  preload() {
    this.image = this.add.image(480, 240, 'loading');

    this.load.image('menu', menu);
    this.load.image('Door1', door1);
    this.load.image('Inside_C', insideC);
    this.load.image('Outside_A2', outsideA2);
    this.load.image('Outside_A3', outsideA3);
    this.load.image('Outside_A5', outsideA5);
    this.load.image('Outside_B', outsideB);
    this.load.image('World_A2', worldA2);
    this.load.image('World_B', worldB);
    this.load.tilemapTiledJSON('mapForest', mapForest);
    this.load.tilemapTiledJSON('mapTemple', mapTemple);
    this.load.tilemapTiledJSON('mapTown', mapTown);
    this.load.tilemapTiledJSON('mapWorld', worldMap);
    this.load.spritesheet('actor', actor, { frameWidth: 48, frameHeight: 48 });
  }

  create() {
    this.scene.start('mainMenu');
  }
}

export default mainMenu;
