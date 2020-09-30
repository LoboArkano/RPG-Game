import Phaser from 'phaser';
import Unit from './unit';

const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize:
  function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    // flip the image so I don't have to edit it manually
  },
});

export default PlayerCharacter;
