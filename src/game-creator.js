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
    console.log(cat);

    return cat;
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

    // the player will collide with this layer
    window.groundLayer.setCollisionByExclusion([-1]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = window.groundLayer.width;
    this.physics.world.bounds.height = window.groundLayer.height;

    addParallax(this);

    // coin image used as tileset
    const coinTiles = window.map.addTilesetImage("coin");
    // add coins as tiles
    window.coinLayer = window.map.createDynamicLayer("Coins", coinTiles, 0, 0);

    // create the player sprite
    window.player = this.physics.add.sprite(200, 200, "player");
    window.player.setCollideWorldBounds(true); // don't go out of the map

    // small fix to our player images, we resize the physics body object slightly
    window.player.body.setSize(window.player.width, window.player.height - 8);

    window.cats.push({
        sprite: addSprite(
            this,
            "enemy",
            { x: 600, y: 280 },
            { width: 100, height: 100 }
        ),
        direction: "left",
        speed: Phaser.Math.Between(150, 220)
    });

    window.cats.push({
        sprite: addSprite(
            this,
            "enemy",
            { x: 1000, y: 280 },
            { width: 100, height: 100 }
        ),
        direction: "left",
        speed: Phaser.Math.Between(150, 220)
    });

    console.log(window.cats[0].sprite.body);

    // player will collide with the level tiles
    this.physics.add.collider(groundLayer, window.player);

    window.cats.forEach(cat => {
        this.physics.add.collider(groundLayer, cat.sprite);
    });

    // player walk animation
    this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNames("player", {
            prefix: "p1_walk",
            start: 1,
            end: 11,
            zeroPad: 2
        }),
        frameRate: 10,
        repeat: -1
    });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: "idle",
        frames: [{ key: "player", frame: "p1_stand" }],
        frameRate: 10
    });

    this.anims.create({
        key: "idle",
        frames: [{ key: "enemy", frame: "mushroom" }],
        frameRate: 1
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
    // fx.play();
    const catCounter = document.querySelector(".cat-counter p span");
    window.cats.forEach(cat => {
        this.physics.add.overlap(window.player, cat.sprite, lol => {
            // shoulde remove the overlapped cat from the window.cats array

            cat.sprite.destroy();
            window.catCounter++;
            catCounter.innerHTML = window.catCounter;
        });
    });
}
