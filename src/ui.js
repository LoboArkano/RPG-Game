import Phaser from 'phaser';
import {
  HeroesMenu, ActionsMenu, EnemiesMenu,
} from './menu';

class ui extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  create(data) {
    this.battleScene = this.scene.get('battle');

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 0.5);
    this.graphics.fillRect(1, 300, 320, 179);
    this.graphics.strokeRect(2, 300, 320, 179);
    this.graphics.fillRect(324, 300, 320, 179);
    this.graphics.strokeRect(324, 300, 320, 179);
    this.graphics.fillRect(645, 300, 315, 179);
    this.graphics.strokeRect(645, 300, 315, 179);

    // basic container to hold all menus
    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(661, 320, this);
    this.actionsMenu = new ActionsMenu(340, 320, this);
    this.enemiesMenu = new EnemiesMenu(17, 320, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    this.remapHeroes();
    this.remapEnemies();
  }

  remapHeroes() {
    const { heroes } = this.battleScene;
    this.heroesMenu.remap(heroes);
  }

  remapEnemies() {
    const { enemies } = this.battleScene;
    this.enemiesMenu.remap(enemies);
  }

  update() {
  }
}

export default ui;
