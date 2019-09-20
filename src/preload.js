import mapJson from "./assets/map.json";
import tiles from "./assets/tiles.png";
import goldcoin from "./assets/coinGold.png";
import playerSprite from "./assets/player.png";
import playerInfo from "./assets/player.json";
import backgroundPattern from "./assets/background-ground.png";

import enemySprite from "./assets/test.png";
import enemyInfo from "./assets/test.json";

import bg1 from "./assets/parallax/parallax-mountain-bg.png";
import bg3 from "./assets/parallax/parallax-mountain-foreground-trees.png";
import bg2 from "./assets/parallax/parallax-mountain-mountains.png";

export default function preload() {
  console.log(this);

  // map made with Tiled in JSON format
  this.load.tilemapTiledJSON("map", mapJson);
  // tiles in spritesheet
  this.load.spritesheet("tiles", tiles, {
    frameWidth: 70,
    frameHeight: 70
  });

  // simple coin image
  this.load.image("coin", goldcoin);

  this.load.atlas("player", playerSprite, playerInfo);
  this.load.atlas("enemy", enemySprite, enemyInfo);

  // Loading parallax assets
  this.load.image("parallax-mountain-bg", bg1);
  this.load.image("parallax-mountain-foreground-trees", bg2);
  this.load.image("parallax-mountain-mountains", bg3);

  this.load.image("background-pattern", backgroundPattern);

  window.game.scale.scaleMode = this.scale.RESIZE;
}
