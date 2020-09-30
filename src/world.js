import Phaser from 'phaser';

let direction = 'standDown';
let player;
let overlapDungeon;
let overlapForest;
let overlapTemple;
let overlapTown;
let spawns;
class world extends Phaser.Scene {
  constructor() {
    super({ key: 'world' });
  }

  create(data) {
    const mappy = this.add.tilemap('mapWorld');
    const worldA2Set = mappy.addTilesetImage('World_A2');
    const worldBSet = mappy.addTilesetImage('World_B');

    mappy.createStaticLayer('soil', worldA2Set, 0, 0).setDepth(-3);
    const objectsLayer = mappy.createStaticLayer('objects', [worldA2Set, worldBSet], 0, 0).setDepth(-2);
    mappy.createStaticLayer('locations', worldBSet, 0, 0).setDepth(-1);
    player = this.physics.add.sprite(data.values.x, data.values.y, 'actor');
    this.physics.add.collider(player, objectsLayer);
    // objectsLayer.setCollisionByProperty({ collides: true });
    objectsLayer.setCollisionByExclusion([-1]);
    // objectsLayer.setCollision([338, 373, 389, 417, 418, 419, 420, 433, 434, 435, 436]);

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
    for (let i = 0; i < 35; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      spawns.create(x, y, 48, 48);
    }
    this.physics.add.overlap(player, spawns, this.onMeetEnemy, false, this);

    this.dungeon = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.dungeon.create(792, 168, 48, 48);
    overlapDungeon = this.physics.add.collider(player, this.dungeon, () => {
      data.values.x = 1536;
      data.values.y = 2928;
      this.physics.world.removeCollider(overlapDungeon);
      this.scene.start('dungeon', data);
    }, false, this);

    this.forest = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.forest.create(936, 1224, 48, 48);
    overlapForest = this.physics.add.collider(player, this.forest, () => {
      data.values.x = 552;
      data.values.y = 72;
      this.physics.world.removeCollider(overlapForest);
      this.scene.start('forest', data);
    }, false, this);

    this.temple = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.temple.create(264, 504, 48, 48);
    overlapTemple = this.physics.add.collider(player, this.temple, () => {
      data.values.x = 552;
      data.values.y = 1128;
      this.physics.world.removeCollider(overlapTemple);
      this.scene.start('temple', data);
    }, false, this);

    this.town = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    this.town.create(648, 888, 48, 48);
    this.town.create(696, 888, 48, 48);
    overlapTown = this.physics.add.collider(player, this.town, () => {
      data.values.x = 552;
      data.values.y = 1350;
      this.physics.world.removeCollider(overlapTown);
      this.scene.start('town', data);
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

export default world;
