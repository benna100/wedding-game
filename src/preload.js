import mapJson from "./assets/map2.json";
import tiles from "./assets/tiles.png";
import goldcoin from "./assets/coinGold.png";

import platformSprite from "./assets/platform.png";
import amandaSprite from "./assets/characters/amanda-walking-sprite.png";
import amandaInfo from "./assets/characters/amanda-walking-sprite.json";

import catSprite from "./assets/characters/cat-walking-sprite.png";
import catInfo from "./assets/characters/cat-walking-sprite.json";

import backgroundPattern from "./assets/background-ground.png";
import po33Sound from "./assets/sound/side_a.mp3";

import enemySprite from "./assets/test.png";
import enemyInfo from "./assets/test.json";

// import bg1 from "./assets/parallax/parallax-mountain-bg.png";
import bg1 from "./assets/parallax/test2.png";
import bg3 from "./assets/parallax/parallax-mountain-foreground-trees.png";
import bg2 from "./assets/parallax/parallax-mountain-mountains.png";

export default function preload() {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON("map", mapJson);
    // tiles in spritesheet
    this.load.spritesheet("tiles", tiles, {
        frameWidth: 70,
        frameHeight: 70,
    });

    // simple coin image
    this.load.image("coin", goldcoin);

    this.load.atlas("player", amandaSprite, amandaInfo);
    this.load.atlas("enemy", catSprite, catInfo);

    // Loading parallax assets
    this.load.image("parallax-mountain-bg", bg1);
    this.load.image("parallax-mountain-foreground-trees", bg2);
    this.load.image("parallax-mountain-mountains", bg3);

    this.load.image("background-pattern", backgroundPattern);

    this.load.image("platform", platformSprite);

    this.load.audio("po33-sound", po33Sound);

    window.game.scale.scaleMode = this.scale.RESIZE;
}
