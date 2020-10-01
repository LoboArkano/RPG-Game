import Phaser from 'phaser';

const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize:

  function Unit(scene, x, y, texture, frame, type, hp, damage) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
    this.type = type;
    this.maxHp = this.hp;
    this.hp = hp;
    this.damage = damage; // default damage
  },

  attack(target) {
    target.takeDamage(this.damage);
    this.scene.events.emit('Message', `${this.type} attacks ${target.type} for ${this.damage} damage`);
  },

  takeDamage(damage) {
    this.hp -= damage;
  },
});

export default Unit;
