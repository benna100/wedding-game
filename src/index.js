import Phaser from "phaser";

import preload from "./preload";
import gameCreator from "./game-creator";
import update from "./update";

import menuController from "./menu-controller";

import "./style/main.scss";

const viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

window.playerConfiguration = {};

const config = {
    type: Phaser.AUTO,
    width: "100%",
    height: "100%",
    parent: "game",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        key: "main",
        preload: preload,
        create: gameCreator,
        update: update
    }
};

window.game = new Phaser.Game(config);

menuController();
