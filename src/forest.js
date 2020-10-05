import Phaser from 'phaser';
import battle from './battle';
import ui from './ui';

let direction = 'standDown';
let player;
let blocks;
let spawns;
let overlapCollider;
class forest extends Phaser.Scene {
  constructor() {
    super({ key: 'forest' });
  }

  create(data) {
    const mappy = this.add.tilemap('mapForest');
    const outsideA2Set = mappy.addTilesetImage('Outside_A2');
    const outsideBSet = mappy.addTilesetImage('Outside_B');

    mappy.createStaticLayer('soil', outsideA2Set, 0, 0).setDepth(-2);
    mappy.createStaticLayer('plants', outsideBSet, 0, 0).setDepth(-1);
    mappy.createStaticLayer('objects', outsideBSet, 0, 0).setDepth(1);
    if (data.values.x === undefined) {
      player = this.physics.add.sprite(480, 400, 'actor');
    } else {
      player = this.physics.add.sprite(data.values.x, data.values.y, 'actor');
    }

    // Collisions
    blocks = this.physics.add.staticGroup();
    blocks.create(504, 24, 'Block').setDepth(-10);
    blocks.create(48, 72, 'Block').setDepth(-10);
    blocks.create(96, 120, 'Block').setDepth(-10);
    blocks.create(768, 120, 'Block').setDepth(-10);
    blocks.create(864, 120, 'Block').setDepth(-10);
    blocks.create(816, 168, 'Block').setDepth(-10);
    blocks.create(672, 216, 'Block').setDepth(-10);
    blocks.create(912, 216, 'Block').setDepth(-10);
    blocks.create(288, 264, 'Block').setDepth(-10);
    blocks.create(96, 312, 'Block').setDepth(-10);
    blocks.create(744, 312, 'Block').setDepth(-10);
    blocks.create(816, 312, 'Block').setDepth(-10);
    blocks.create(912, 312, 'Block').setDepth(-10);
    blocks.create(48, 360, 'Block').setDepth(-10);
    blocks.create(600, 360, 'Block').setDepth(-10);
    blocks.create(864, 360, 'Block').setDepth(-10);
    blocks.create(312, 408, 'Block').setDepth(-10);
    blocks.create(816, 408, 'Block').setDepth(-10);
    blocks.create(456, 456, 'Block').setDepth(-10);
    this.physics.add.collider(player, blocks);

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
    for (let i = 0; i < 20; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(100, this.physics.world.bounds.height - 130);
      // parameters are x, y, width, height
      spawns.create(x, y, 30, 30);
    }
    this.physics.add.collider(player, spawns, this.onMeetEnemy, false, this);

    this.exit = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.exit.create(552, 24, 48, 48);
    overlapCollider = this.physics.add.collider(player, this.exit, () => {
      data.values.x = 936;
      data.values.y = 1174;
      this.physics.world.removeCollider(overlapCollider);
      this.scene.start('world', data);
    }, false, this);

    this.sys.events.on('wake', this.wake, this);
  }

  wake() {
    this.keyboard.A.reset();
    this.keyboard.S.reset();
    this.keyboard.W.reset();
    this.keyboard.D.reset();
  }

  onMeetEnemy(player, zone) {
    // we move the zone to some other location
    this.physics.world.removeCollider(zone);
    zone.x = -48;
    zone.y = -48;
    this.data.values.location = 'forest';
    // shake the world
    this.cameras.main.flash(200);

    this.scene.add('ui', ui);
    this.scene.add('battle', battle);

    // start battle
    this.scene.sleep('forest');
    this.scene.launch('battle', this.data);
  }

  update() {
    player.body.setVelocity(0);

    if (this.keyboard.A.isDown) {
      // Left
      player.body.setVelocityX(-80);
      player.anims.play('left', true);
      direction = 'standLeft';
    } else if (this.keyboard.D.isDown) {
      // Right
      player.body.setVelocityX(80);
      player.anims.play('right', true);
      direction = 'standRight';
    } else if (this.keyboard.W.isDown) {
      // Up
      player.body.setVelocityY(-80);
      player.anims.play('up', true);
      direction = 'standUp';
    } else if (this.keyboard.S.isDown) {
      // Down
      player.body.setVelocityY(80);
      player.anims.play('down', true);
      direction = 'standDown';
    } else {
      player.anims.play(direction);
    }
  }
}

export default forest;
