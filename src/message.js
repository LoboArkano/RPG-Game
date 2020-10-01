import Phaser from 'phaser';

const Message = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize:

  function Message(scene, events) {
    Phaser.GameObjects.Container.call(this, scene, 160, 30);
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(175, 50, 300, 150);
    graphics.fillRect(175, 50, 300, 150);
    this.text = new Phaser.GameObjects.Text(scene, 325, 120, '', {
      color: '#ffffff', align: 'center', fontSize: 18, wordWrap: { width: 200, useAdvancedWrap: true },
    });
    this.add(this.text);
    this.text.setOrigin(0.5);
    events.on('Message', this.showMessage, this);
    this.visible = false;
  },

  showMessage(text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent(
      { delay: 2000, callback: this.hideMessage, callbackScope: this },
    );
  },

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  },
});

export default Message;
