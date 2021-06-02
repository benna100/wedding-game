import mapJson from "./assets/map2.json";
import tiles from "./assets/tiles.png";
import goldcoin from "./assets/coinGold.png";

import platformSprite from "./assets/platform.png";

import amandaSprite from "./assets/characters/amanda-walking-sprite.png";
import amandaInfo from "./assets/characters/amanda-walking-sprite.json";

import madsSprite from "./assets/characters/mads-walking-sprite.png";
import madsInfo from "./assets/characters/mads-walking-sprite.json";

import catSprite from "./assets/characters/cat-walking-sprite.png";
import catInfo from "./assets/characters/cat-walking-sprite.json";

import evilCatSprite from "./assets/characters/evil-cat-walking-sprite.png";
import evilCatInfo from "./assets/characters/evil-cat-walking.json";

import backgroundPattern from "./assets/background-ground.png";
import po33Sound1 from "./assets/sound/side-a-optimized.mp3";
import po33Sound2 from "./assets/sound/side-a1-optimized.mp3";
import po33Sound3 from "./assets/sound/side-b-optimized.mp3";
import po33Sound4 from "./assets/sound/side-b2-optimized.mp3";

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

    this.load.on("complete", function () {
        document.querySelector("section.loader").style.display = "none";
        document.querySelector("section.screens").style.display = "block";
        window.secondsElapsed = 0;

        window.controlsElement.classList.add("visible");
    });

    // simple coin image
    this.load.image("coin", goldcoin);

    this.load.atlas(
        "player",
        window.playerConfiguration.player === "mads"
            ? madsSprite
            : amandaSprite,
        window.playerConfiguration.player === "mads" ? madsInfo : amandaInfo
    );

    this.load.atlas("cat", catSprite, catInfo);

    this.load.atlas("evil-cat", evilCatSprite, evilCatInfo);

    // Loading parallax assets
    this.load.image("parallax-mountain-bg", bg1);
    this.load.image("parallax-mountain-foreground-trees", bg2);
    this.load.image("parallax-mountain-mountains", bg3);

    this.load.image("background-pattern", backgroundPattern);

    this.load.image("platform", platformSprite);

    this.load.audio("po33-sound1", po33Sound1);
    this.load.audio("po33-sound2", po33Sound2);
    this.load.audio("po33-sound3", po33Sound3);
    this.load.audio("po33-sound", po33Sound4);

    window.game.scale.scaleMode = this.scale.RESIZE;
}
