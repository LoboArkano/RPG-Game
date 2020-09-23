import outsideA2 from './assets/images/tileset/Outside_A2.png';
import outsideB from './assets/images/tileset/Outside_B.png';
import mapJSON from './assets/images/maps/testMap.json';

class forest extends Phaser.Scene {
  constructor() {
    super({ key: 'forest' });
  }

  preload() {
    this.load.image('Outside_A2', outsideA2);
    this.load.image('Outside_B', outsideB);
    this.load.tilemapTiledJSON('mappy', mapJSON);
  }

  create() {
    const mappy = this.add.tilemap('mappy');
    const outsideA2Set = mappy.addTilesetImage('Outside_A2');
    const outsideBSet = mappy.addTilesetImage('Outside_B');

    const soilLayer = mappy.createStaticLayer('soil', outsideA2Set, 0, 0).setDepth(-2);
    const plantsLayer = mappy.createStaticLayer('plants', outsideBSet, 0, 0).setDepth(-1);
    const objectsLayer = mappy.createStaticLayer('objects', outsideBSet, 0, 0).setDepth(1);
  }
}

export default forest;
