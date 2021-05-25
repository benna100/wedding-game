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

window.playerConfiguration = {};
window.catCounter = 0;
window.cats = [];
window.evilCats = [];

const config = {
    type: Phaser.AUTO,
    width: "100%",
    height: "100%",
    parent: "game",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
            debug: false,
        },
    },
    scene: {
        key: "main",
        preload: preload,
        create: gameCreator,
        update: update,
    },
};

export default function () {
    let mainMenuActiveButtonIndex = 0;
    const mainMenuLinks = document.querySelectorAll(
        "section.screens ul li.main-menu > ul > li > button"
    );

    const mainMenu = document.querySelector("section.screens ul li.main-menu");
    const selectCharacter = document.querySelector(
        "section.screens ul li.select-character"
    );

    const characters = document.querySelectorAll(
        "section.screens > ul > li.select-character ul > li"
    );

    document.onkeydown = checkKey;

    let characterSelectIndex = 0;

    function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == "38") {
            // up
            mainMenuActiveButtonIndex--;

            if (mainMenuActiveButtonIndex === -1) {
                mainMenuActiveButtonIndex = mainMenuLinks.length - 1;
            }
        } else if (e.keyCode == "40") {
            mainMenuActiveButtonIndex++;

            // down
            if (mainMenuActiveButtonIndex === mainMenuLinks.length) {
                mainMenuActiveButtonIndex = 0;
            }
        } else if (e.keyCode == "37") {
            // left arrow
            characterSelectIndex--;

            if (characterSelectIndex === -1) {
                characterSelectIndex = characters.length - 1;
            }
        } else if (e.keyCode == "39") {
            // right arrow
            characterSelectIndex++;

            if (characterSelectIndex === characters.length) {
                characterSelectIndex = 0;
            }
        } else if (e.keyCode == "13") {
            // enter key
            if (selectCharacter.classList.contains("visible")) {
                showScreen("game");

                if (characterSelectIndex === 0) {
                    window.playerConfiguration.player = "mads";
                } else if (characterSelectIndex === 1) {
                    window.playerConfiguration.player = "amanda";
                }
                console.log(window.playerConfiguration.player);
                window.game = new Phaser.Game(config);
            }

            if (
                mainMenu.classList.contains("visible") &&
                mainMenuActiveButtonIndex === 0
            ) {
                showScreen("select-character");
            }
        }

        characters.forEach((mainMenuLink) =>
            mainMenuLink.classList.remove("active")
        );

        characters[characterSelectIndex].classList.add("active");
    }

    const startButton = document.querySelector(
        "section.screens ul li.main-menu button.start"
    );

    startButton.addEventListener("click", () => {
        showScreen("select-character");
    });

    const selectCharacterButtons = document.querySelectorAll(
        "section.screens ul li.select-character button"
    );

    selectCharacterButtons.forEach((characterButton) => {
        characterButton.addEventListener("click", (evt) => {
            showScreen("game");
            console.log(evt.target.classList);

            if ([...evt.target.classList].indexOf("mads") >= 0) {
                window.playerConfiguration.player = "mads";
            } else if (characterSelectIndex === 1) {
                window.playerConfiguration.player = "amanda";
            }

            window.game = new Phaser.Game(config);

            window.secondsElapsed = 0;
            const timerElement = document.querySelector(".timer");
            window.interval = setInterval(() => {
                window.secondsElapsed++;
                timerElement.innerHTML = `${window.secondsElapsed} sekunder`;
            }, 1000);
        });
    });
}

const screens = document.querySelectorAll("section.screens ul li");

function showScreen(screenId) {
    screens.forEach((screens) => screens.classList.remove("visible"));

    if (screenId === "game") {
        return;
    }

    document
        .querySelector(`section.screens ul li.${screenId}`)
        .classList.add("visible");
}
