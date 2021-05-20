const viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

const body = document.querySelector("body");

body.addEventListener("touchstart", handleStart, false);
body.addEventListener("touchend", handleEnd, false);

let leftTouchDown = false;
let rightTouchDown = false;

function handleStart(evt) {
    // evt.preventDefault();
    console.log("touchstart.");
    var touches = evt.changedTouches;
    touches = Array.from(touches);
    touches.forEach((touch) => {
        const tapAboveMiddle = touch.pageY < (viewportHeight / 100) * 66;
        const tapToLeftOfMiddle = touch.pageX < viewportWidth / 2;
        const tapToRightOfMiddle = touch.pageX > viewportWidth / 2;

        if (tapAboveMiddle) {
            if (window.player.body.onFloor()) {
                window.player.body.setVelocityY(-500);
            }
        } else if (tapToLeftOfMiddle) {
            leftTouchDown = true;
        } else if (tapToRightOfMiddle) {
            rightTouchDown = true;
        }
    });
}

function handleEnd(evt) {
    // evt.preventDefault();
    var touches = evt.changedTouches;
    touches = Array.from(touches);
    touches.forEach((touch) => {
        const tapAboveMiddle = touch.pageY < viewportHeight / 2;
        const tapToLeftOfMiddle = touch.pageX < viewportWidth / 2;
        const tapToRightOfMiddle = touch.pageX > viewportWidth / 2;

        if (tapAboveMiddle) {
        } else if (tapToLeftOfMiddle) {
            leftTouchDown = false;
        } else if (tapToRightOfMiddle) {
            rightTouchDown = false;
        }
    });
}

export default function update(time, delta) {
    this.parallaxMountainBg.tilePositionX =
        this.cameras.cameras[0].scrollX * 0.1;
    this.parallaxMountainForegroundTrees.tilePositionX =
        this.cameras.cameras[0].scrollX * 0.2;

    this.parallaxMountainBg.tilePositionY =
        this.cameras.cameras[0].scrollY * 0.15;
    this.parallaxMountainForegroundTrees.tilePositionY =
        this.cameras.cameras[0].scrollY * 0.15;

    if (window.cursors.left.isDown || leftTouchDown) {
        window.player.body.setVelocityX(-200);
        window.player.anims.play("walk", true); // walk left
        window.player.flipX = true; // flip the sprite to the left
    } else if (window.cursors.right.isDown || rightTouchDown) {
        window.player.body.setVelocityX(200);
        window.player.anims.play("walk", true);
        window.player.flipX = false; // use the original sprite looking to the right
    } else {
        window.player.body.setVelocityX(0);
        window.player.anims.play("idle", true);
    }

    // if (window.cursors.space.isDown) {
    //     const bullet = this.physics.add.sprite(
    //         window.player.body.center.x,
    //         window.player.body.center.y,
    //         "enemy"
    //     );
    //     bullet.setDisplaySize(10, 10);

    //     bullet.body.setVelocityX(window.player.flipX ? -600 : 600);
    //     bullet.body.setVelocityY(-200);
    // }

    // jump

    // todo: also make jumping possible on platforms
    if (
        window.cursors.up.isDown &&
        (window.player.body.blocked.down || window.player.body.touching.down)
    ) {
        window.player.body.setVelocityY(-500);
    }

    window.cats.forEach((cat) => {
        // improve, remove from the cats array
        if (cat.sprite.body) {
            if (Phaser.Math.Between(0, 1000) === 0) {
                cat.sprite.body.setVelocityY(-200);
            }

            if (cat.direction === "left") {
                cat.sprite.body.setVelocityX(-cat.speed);
            } else if (cat.direction === "right") {
                cat.sprite.body.setVelocityX(cat.speed);
            }

            const iscatMovingToTheRight = cat.sprite.body.velocity.x > 0;

            // in front and down
            const tileInFrontOfcat = window.groundLayer.getTileAtWorldXY(
                iscatMovingToTheRight ? cat.sprite.x + 10 : cat.sprite.x - 10,
                cat.sprite.y + 10
            );

            const isTileInFrontOfcat = Boolean(tileInFrontOfcat);

            const isCatJumping = !cat.sprite.body.onFloor();

            if (!isCatJumping) {
                if (cat.sprite.body.onWall() || !isTileInFrontOfcat) {
                    const inverseDirection =
                        cat.direction === "right" ? "left" : "right";
                    cat.direction = inverseDirection;
                }
            }
        }
    });

    // window.platform.setVelocityX(10);
}
