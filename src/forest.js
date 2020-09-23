import outsideA2 from './assets/images/tileset/Outside_A2.png';
import outsideB from './assets/images/tileset/Outside_B.png';
import mapJSON from './assets/images/maps/testMap.json';
import actor from './assets/images/characters/Protas.png';

class forest extends Phaser.Scene {
  constructor() {
    super({ key: 'forest' });
  }

  preload() {
    this.load.image('Outside_A2', outsideA2);
    this.load.image('Outside_B', outsideB);
    this.load.tilemapTiledJSON('mappy', mapJSON);
    this.load.spritesheet('actor', actor, { frameWidth: 48, frameHeight: 48 });
  }

  create() {
    const mappy = this.add.tilemap('mappy');
    const outsideA2Set = mappy.addTilesetImage('Outside_A2');
    const outsideBSet = mappy.addTilesetImage('Outside_B');

    const soilLayer = mappy.createStaticLayer('soil', outsideA2Set, 0, 0).setDepth(-2);
    const plantsLayer = mappy.createStaticLayer('plants', outsideBSet, 0, 0).setDepth(-1);
    const objectsLayer = mappy.createStaticLayer('objects', outsideBSet, 0, 0).setDepth(1);

    objectsLayer.setCollisionByProperty({ collides: true });
    this.player = this.physics.add.sprite(480, 400, 'actor');

    this.physics.world.bounds.width = mappy.widthInPixels;
    this.physics.world.bounds.height = mappy.heightInPixels;
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, objectsLayer);
    this.cameras.main.startFollow(this.player);

    this.anims.create({
      key: 'standDown',
      frames: [{ key: 'actor', frame: 1 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'standLeft',
      frames: [{ key: 'actor', frame: 13 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'standRight',
      frames: [{ key: 'actor', frame: 25 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'standUp',
      frames: [{ key: 'actor', frame: 37 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('actor', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('actor', { start: 12, end: 14 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('actor', { start: 24, end: 26 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('actor', { start: 36, end: 38 }),
      frameRate: 8,
      repeat: -1,
    });

    this.keyboard = this.input.keyboard.addKeys('W,A,S,D');
  }

  update() {
    this.direction = 'standDown';
    if (this.keyboard.A.isDown) {
      // Left
      this.player.x -= 5;
      this.player.anims.play('left', true);
      this.direction = 'standLeft';
    } else if (this.keyboard.D.isDown) {
      // Right
      this.player.x += 5;
      this.player.anims.play('right', true);
      this.direction = 'standRight';
    } else if (this.keyboard.W.isDown) {
      // Up
      this.player.y -= 5;
      this.player.anims.play('up', true);
      this.direction = 'standUp';
    } else if (this.keyboard.S.isDown) {
      // Down
      this.player.y += 5;
      this.player.anims.play('down', true);
      this.direction = 'standDown';
    } else {
      this.player.anims.play(this.direction);
    }
  }
}

export default forest;
