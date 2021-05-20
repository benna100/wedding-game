import addParallax from "./parallax";
import { LEFT } from "phaser";

const viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

function addSprite(scene, spriteKey, startPosition, size) {
    // create the enemy sprite
    const cat = scene.physics.add.sprite(
        startPosition.x,
        startPosition.y,
        spriteKey
    );

    cat.setCollideWorldBounds(true); // don't go out of the map

    // small fix to our cat images, we resize the physics body object slightly
    cat.body.setSize(size.width, size.height);
    cat.setDisplaySize(size.width, size.height);

    return cat;
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
    window.player.setScale(1.5);
    window.player.setCollideWorldBounds(true); // don't go out of the map

    // for (let index = 0; index < 10; index++) {
    //     addPlatform({
    //         x: Phaser.Math.Between(0, 3600),
    //         y: Phaser.Math.Between(50, 150),
    //         width: Phaser.Math.Between(50, 400),
    //         height: 20,
    //         scene: this,
    //     });
    // }

    // const platforms = this.physics.add.staticGroup();
    // window.platform = platforms.create(50, 250, "platform");
    // console.log(window.platform);

    // this.physics.add.collider(player, platforms);

    // window.platform.setVelocityX(10);

    for (let i = 0; i < 15; i++) {
        const x = Phaser.Math.Between(0, 3600);
        const y = Phaser.Math.Between(0, 200);

        window.cats.push({
            sprite: addSprite(
                this,
                "enemy",
                {
                    x,
                    y,
                },
                { width: 100, height: 100 }
            ),
            direction: "left",
            speed: Phaser.Math.Between(150, 220),
        });
    }

    // player will collide with the level tiles
    this.physics.add.collider(groundLayer, window.player);

    window.cats.forEach((cat) => {
        this.physics.add.collider(groundLayer, cat.sprite);
    });

    // player walk animation
    this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames("player", {
            prefix: "sprite",
            start: 1,
            end: 3,
        }),
        frameRate: 7,
        repeat: -1,
    });

    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: "idle",
        frames: [{ key: "player", frame: "amanda-walk-real-02" }],
        frameRate: 10,
    });

    this.anims.create({
        key: "idle",
        frames: [{ key: "enemy", frame: "mushroom" }],
        frameRate: 1,
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

    const fx = this.sound.add("po33-sound");
    fx.loop = true;
    fx.play();
    const catCounter = document.querySelector(".cat-counter p span");
    window.cats.forEach((cat) => {
        this.physics.add.overlap(window.player, cat.sprite, (lol) => {
            // shoulde remove the overlapped cat from the window.cats array

            cat.sprite.destroy();
            window.catCounter++;
            catCounter.innerHTML = window.catCounter;
        });
    });
}
