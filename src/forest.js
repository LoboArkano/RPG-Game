import Phaser from 'phaser';
import outsideA2 from './assets/images/tileset/Outside_A2.png';
import outsideB from './assets/images/tileset/Outside_B.png';
import mapForest from './assets/images/maps/testMap.json';
import actor from './assets/images/characters/Protas.png';

let direction = 'standDown';
let player;
let spawns;
let overlapCollider;
class forest extends Phaser.Scene {
  constructor() {
    super({ key: 'forest' });
  }

  preload() {
    this.load.image('Outside_A2', outsideA2);
    this.load.image('Outside_B', outsideB);
    this.load.tilemapTiledJSON('mappy', mapForest);
    this.load.spritesheet('actor', actor, { frameWidth: 48, frameHeight: 48 });
  }

  create() {
    const mappy = this.add.tilemap('mappy');
    const outsideA2Set = mappy.addTilesetImage('Outside_A2');
    const outsideBSet = mappy.addTilesetImage('Outside_B');

    mappy.createStaticLayer('soil', outsideA2Set, 0, 0).setDepth(-2);
    mappy.createStaticLayer('plants', outsideBSet, 0, 0).setDepth(-1);
    const objectsLayer = mappy.createStaticLayer('objects', outsideBSet, 0, 0);
    player = this.physics.add.sprite(480, 400, 'actor');
    this.physics.add.collider(player, objectsLayer);
    // objectsLayer.setCollisionByProperty({ collides: true });
    // objectsLayer.setCollisionByExclusion([-1]);
    objectsLayer.setCollision([145, 180, 196, 224, 225, 226, 227, 240, 241, 242, 243]);

    this.physics.world.bounds.width = mappy.widthInPixels;
    this.physics.world.bounds.height = mappy.heightInPixels;
    player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, mappy.widthInPixels, mappy.heightInPixels);
    this.cameras.main.startFollow(player);
    this.cameras.main.roundPixels = true;

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

    spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 25; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height) - 100;
      // parameters are x, y, width, height
      spawns.create(x, y, 48, 48);
    }
    this.physics.add.overlap(player, spawns, this.onMeetEnemy, false, this);

    this.exit = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.exit.create(552, 24, 48, 48);
    overlapCollider = this.physics.add.collider(player, this.exit, () => {
      this.physics.world.removeCollider(overlapCollider);
      this.scene.start('world');
    }, false, this);
  }

  onMeetEnemy(player, zone) {
    // we move the zone to some other location
    zone.x = -48;
    zone.y = -48;
    // shake the world
    this.cameras.main.flash(200);
    // start battle
  }

  update() {
    if (this.keyboard.A.isDown) {
      // Left
      player.x -= 5;
      player.anims.play('left', true);
      direction = 'standLeft';
    } else if (this.keyboard.D.isDown) {
      // Right
      player.x += 5;
      player.anims.play('right', true);
      direction = 'standRight';
    } else if (this.keyboard.W.isDown) {
      // Up
      player.y -= 5;
      player.anims.play('up', true);
      direction = 'standUp';
    } else if (this.keyboard.S.isDown) {
      // Down
      player.y += 5;
      player.anims.play('down', true);
      direction = 'standDown';
    } else {
      player.anims.play(direction);
    }
  }
}

export default forest;
