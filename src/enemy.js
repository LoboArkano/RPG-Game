import Phaser from 'phaser';
import Unit from './unit';

const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize:
  function Enemy(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    switch (type) {
      case 'Ghost Armor':
        this.flipX = true;
        this.setScale(0.6);
        break;
      case 'General':
        this.flipX = true;
        this.setScale(0.9);
        break;
      case 'Orc':
        this.flipX = true;
        this.setScale(0.8);
        break;
      case 'Behemoth':
        this.setScale(0.7);
        break;
      default:
        this.setScale(0.8);
    }
  },
});

export default Enemy;
