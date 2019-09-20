import Phaser from "phaser";

import preload from "./preload";
import gameCreator from "./game-creator";
import update from "./update";

import "./style/main.scss";

const viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

const config = {
    type: Phaser.AUTO,
    width: viewportWidth,
    height: viewportHeight,
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

setTimeout(() => {
    console.log(document.querySelector("section.menu"));
}, 0);

const menu = document.querySelector("section.menu");

const startButton = document.querySelector("section.menu ul li button.start");

document;
startButton.addEventListener("click", () => {
    menu.classList.add("hidden");
});
