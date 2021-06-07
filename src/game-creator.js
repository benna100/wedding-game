import addParallax from "./parallax";
import { LEFT } from "phaser";

var audio = require("browser-audio");

import po33Sound1 from "./assets/sound/side-a-optimized.mp3";
import po33Sound2 from "./assets/sound/side-a1-optimized.mp3";
import po33Sound3 from "./assets/sound/side-b-optimized.mp3";
import po33Sound4 from "./assets/sound/side-b2-optimized.mp3";
import { Howl, Howler } from "howler";

const viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

window.playing = false;

const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

function addSprite(scene, spriteKey, startPosition, size) {
    // create the a sprite
    const sprite = scene.physics.add.sprite(
        startPosition.x,
        startPosition.y,
        spriteKey
    );

    sprite.setCollideWorldBounds(true); // don't go out of the map

    // small fix to our sprite images, we resize the physics body object slightly
    sprite.body.setSize(size.width, size.height);
    sprite.setDisplaySize(size.width, size.height);

    return sprite;
}

function addPlatform({ x, y, width, height, scene }) {
    const platform = scene.physics.add.sprite(x, y, "platform");

    platform
        .setSize(width, height)
        .setDisplaySize(width, height)
        .setVelocityX(30)
        .setBounce(1)
        .setImmovable(true);

    platform.body.allowGravity = false;
    scene.physics.add.collider(player, platform);

    return platform;
}

export default function create() {
    // load the map
    window.map = this.make.tilemap({ key: "map" });

    // tiles for the ground layer
    const groundTiles = window.map.addTilesetImage("tiles");

    // create the ground layer
    window.groundLayer = window.map.createDynamicLayer(
        "World",
        groundTiles,
        0,
        0
    );
    let rotated = false;
    window.groundLayer.setTileIndexCallback(
        7,
        function () {
            if (!rotated) {
                document.querySelector("body").classList.add("rotate");
                rotated = true;
            } else {
                document.querySelector("body").classList.remove("rotate");
                rotated = false;
            }
        },
        this
    );

    // the player will collide with this layer
    window.groundLayer.setCollisionByExclusion([-1]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = window.groundLayer.width;
    this.physics.world.bounds.height = window.groundLayer.height;

    addParallax(this);

    // create the player sprite
    window.player = this.physics.add.sprite(200, 200, "player");

    window.playerConfiguration.player === "mads"
        ? window.player.setScale(1.6)
        : window.player.setScale(1.3);
    window.player.setCollideWorldBounds(true); // don't go out of the map

    // 20
    const numberOfCats = 30;
    for (let i = 0; i < numberOfCats; i++) {
        const x = Phaser.Math.Between(0, 3600);
        const y = Phaser.Math.Between(0, 200);

        window.cats.push({
            sprite: addSprite(
                this,
                "cat",
                {
                    x,
                    y,
                },
                { width: 51.5, height: 45.5 }
            ),
            direction: Phaser.Math.Between(0, 1) === 0 ? "left" : "right",
            speed: Phaser.Math.Between(150, 220),
        });
    }

    // 5
    window.evilCats = [];
    const numberOfEvilCats = 8;
    for (let i = 0; i < numberOfEvilCats; i++) {
        const x = Phaser.Math.Between(0, 3600);
        const y = Phaser.Math.Between(0, 200);

        window.evilCats.push({
            sprite: addSprite(
                this,
                "evil-cat",
                {
                    x,
                    y,
                },
                { width: 51.5, height: 45.5 }
            ).setScale(1.1),
            direction: Phaser.Math.Between(0, 1) === 0 ? "left" : "right",
            speed: Phaser.Math.Between(150, 220),
        });

        window.evilCats.forEach((cat) => {
            cat.sprite.body.offset.y = 22;
        });
    }

    // player will collide with the level tiles
    this.physics.add.collider(groundLayer, window.player);

    window.cats.forEach((cat) => {
        this.physics.add.collider(groundLayer, cat.sprite);
    });

    window.evilCats.forEach((evilCat) => {
        this.physics.add.collider(groundLayer, evilCat.sprite);
    });

    // player walk animation
    this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames("player", {
            prefix: "sprite",
            start: 1,
            end: window.playerConfiguration.player === "mads" ? 5 : 3,
        }),
        frameRate: 7,
        repeat: -1,
    });

    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: "idle",
        frames: [{ key: "player", frame: "player-walk-real-02" }],
        frameRate: 10,
    });

    this.anims.create({
        key: "idle",
        frames: [{ key: "cat", frame: "mushroom" }],
        frameRate: 1,
    });

    this.anims.create({
        key: "walk-cat",
        frames: this.anims.generateFrameNames("cat", {
            prefix: "sprite",
            start: 1,
            end: 3,
        }),
        frameRate: 7,
        repeat: -1,
    });

    window.cats.forEach((cat) => {
        try {
            cat.sprite.anims.play("walk-cat", true);
        } catch (error) {}
    });

    this.anims.create({
        key: "walk-evil-cat",
        frames: this.anims.generateFrameNames("evil-cat", {
            prefix: "sprite",
            start: 1,
            end: 8,
        }),
        frameRate: 7,
        repeat: -1,
    });

    window.evilCats.forEach((evilCat) => {
        try {
            evilCat.sprite.anims.play("walk-evil-cat", true);
        } catch (error) {}
    });

    window.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(
        0,
        0,
        window.map.widthInPixels,
        window.map.heightInPixels
    );
    // make the camera follow the player
    this.cameras.main.startFollow(window.player);

    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor("#c99869");
    // this.cameras.main.setViewport(0, 0, viewportWidth * 2, viewportHeight * 2);
    if (viewportWidth < 700) {
        this.cameras.main.zoomTo(0.8);
    }

    if (!window.playing) {
        switch (Phaser.Math.Between(1, 4)) {
            case 1:
                var sound = new Howl({
                    src: [po33Sound1],
                    loop: true,
                    volume: 0.5,
                });
                if (!window.wantSoundOff) {
                    sound.play();
                }
                break;
            case 2:
                var sound = new Howl({
                    src: [po33Sound2],
                    loop: true,
                    volume: 0.5,
                });

                if (!window.wantSoundOff) {
                    sound.play();
                }
                break;
            case 3:
                var sound = new Howl({
                    src: [po33Sound3],
                    loop: true,
                    volume: 0.5,
                });

                if (!window.wantSoundOff) {
                    sound.play();
                }
                break;
            case 4:
                var sound = new Howl({
                    src: [po33Sound4],
                    loop: true,
                    volume: 0.5,
                });

                if (!window.wantSoundOff) {
                    sound.play();
                }
                break;
            default:
                break;
        }
    }
    window.playing = true;

    const catCounterElement = document.querySelector(".cat-counter p span");
    window.cats.forEach((cat) => {
        this.physics.add.overlap(window.player, cat.sprite, (lol) => {
            // shoulde remove the overlapped cat from the window.cats array

            cat.sprite.destroy();
            window.catCounter++;
            catCounterElement.innerHTML = `${window.catCounter}/${numberOfCats}`;
            let that = this;

            if (window.catCounter === numberOfCats) {
                const screens = document.querySelectorAll(
                    "section.screens ul li"
                );
                screens.forEach((screens) =>
                    screens.classList.remove("visible")
                );

                that.scene.stop();

                document
                    .querySelector(`section.screens ul li.success`)
                    .classList.add("visible");

                window.controlsElement.classList.remove("visible");

                clearInterval(window.interval);
                document.querySelector(".success .time").innerHTML =
                    window.secondsElapsed;
            }
        });
    });

    let once = false;
    window.evilCats.forEach((evilCat) => {
        this.physics.add.overlap(window.player, evilCat.sprite, (lol) => {
            // shoulde remove the overlapped evilCat from the window.cats array
            // all aboard the badpractice train choo choo 🚂☁☁☁☁☁☁☁
            const that = this;
            // window.location.reload();
            // this.registry.destroy();
            // this.events.off();
            if (!once) {
                const screens = document.querySelectorAll(
                    "section.screens ul li"
                );
                screens.forEach((screens) =>
                    screens.classList.remove("visible")
                );

                document
                    .querySelector(`section.screens ul li.you-died`)
                    .classList.add("visible");
                that.scene.stop();
                window.controlsElement.classList.remove("visible");

                document
                    .querySelector("li.you-died button")
                    .addEventListener("click", () => {
                        that.scene.restart();
                        window.catCounter = 0;
                        window.secondsElapsed = 0;

                        screens.forEach((screens) =>
                            screens.classList.remove("visible")
                        );

                        window.controlsElement.classList.add("visible");

                        console.log(
                            document.querySelector(
                                `section.screens ul li.level-1-intro`
                            )
                        );
                    });
                once = true;
            }
        });
    });
}
