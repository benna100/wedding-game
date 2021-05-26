const viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

const body = document.querySelector("body");

let leftTouchDown = false;
let rightTouchDown = false;

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const jump = document.querySelector(".jump");

function attachMobileTouch() {
    const body = document.querySelector("body");

    body.addEventListener("touchstart", handleStart, false);
    body.addEventListener("touchend", handleEnd, false);

    function getKeyCodeFromTouchEvent(touchEvent, isTouchStart) {
        const jumpTab =
            touchEvent.pageY > viewportHeight - 200 &&
            touchEvent.pageX > (viewportWidth / 3) * 2;
        const leftTab =
            touchEvent.pageY > viewportHeight - 200 &&
            touchEvent.pageX < viewportWidth / 3;
        const rightTab =
            touchEvent.pageY > viewportHeight - 200 &&
            touchEvent.pageX > viewportWidth / 3 &&
            touchEvent.pageX < (viewportWidth / 3) * 2;

        if (jumpTab) {
            if (window.player.body.onFloor()) {
                window.player.body.setVelocityY(-500);
            }

            isTouchStart
                ? jump.classList.add("active")
                : jump.classList.remove("active");
        } else if (leftTab) {
            leftTouchDown = isTouchStart;
            isTouchStart
                ? left.classList.add("active")
                : left.classList.remove("active");
        } else if (rightTab) {
            rightTouchDown = isTouchStart;
            isTouchStart
                ? right.classList.add("active")
                : right.classList.remove("active");
        }
    }

    function handleStart(evt) {
        var touches = evt.changedTouches;
        touches = Array.from(touches);
        touches.forEach((touch) => {
            const keyCode = getKeyCodeFromTouchEvent(touch, true);
        });
    }

    function handleEnd(evt) {
        // evt.preventDefault();
        var touches = evt.changedTouches;
        touches = Array.from(touches);
        touches.forEach((touch) => {
            const keyCode = getKeyCodeFromTouchEvent(touch, false);
        });
    }
}

attachMobileTouch();

export default function update(time, delta) {
    this.parallaxMountainBg.tilePositionX =
        this.cameras.cameras[0].scrollX * 0.1;
    this.parallaxMountainForegroundTrees.tilePositionX =
        this.cameras.cameras[0].scrollX * 0.2;

    this.parallaxMountainBg.tilePositionY =
        this.cameras.cameras[0].scrollY * 0.15;
    this.parallaxMountainForegroundTrees.tilePositionY =
        this.cameras.cameras[0].scrollY * 0.15;
    // console.log(window.player.body);
    const speed = window.playerConfiguration.player === "mads" ? 350 : 400;
    if (window.cursors.left.isDown || leftTouchDown) {
        // setFriction setDrag
        window.player.body.setVelocityX(-speed);
        window.player.anims.play("walk", true); // walk left
        window.player.flipX = true; // flip the sprite to the left
    } else if (window.cursors.right.isDown || rightTouchDown) {
        window.player.body.setVelocityX(speed);
        window.player.anims.play("walk", true);
        window.player.flipX = false; // use the original sprite looking to the right
    } else {
        window.player.body.setVelocityX(0);
        window.player.anims.play("idle", true);
    }

    // jump

    // todo: also make jumping possible on platforms
    const jumpHeight = window.playerConfiguration.player === "mads" ? 600 : 500;
    if (
        window.cursors.up.isDown &&
        (window.player.body.blocked.down || window.player.body.touching.down)
    ) {
        window.player.body.setVelocityY(-jumpHeight);
    }

    window.cats.forEach((cat) => {
        // improve, remove from the cats array
        if (cat.sprite.body) {
            if (Phaser.Math.Between(0, 100) === 0) {
                cat.sprite.body.setVelocityY(Phaser.Math.Between(-400, -800));
            }

            if (cat.direction === "left") {
                cat.sprite.body.setVelocityX(-cat.speed);
            } else if (cat.direction === "right") {
                cat.sprite.body.setVelocityX(cat.speed);
            }

            const iscatMovingToTheRight = cat.sprite.body.velocity.x > 0;

            // in front and down
            const tileInFrontOfcat = window.groundLayer.getTileAtWorldXY(
                iscatMovingToTheRight ? cat.sprite.x + 40 : cat.sprite.x - 40,
                cat.sprite.y + 40
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

    window.evilCats.forEach((evilCat) => {
        // improve, remove from the cats array
        if (evilCat.sprite.body) {
            if (Phaser.Math.Between(0, 100) === 0) {
                evilCat.sprite.body.setVelocityY(
                    Phaser.Math.Between(-400, -800)
                );
            }

            if (evilCat.direction === "left") {
                evilCat.sprite.body.setVelocityX(-evilCat.speed);
            } else if (evilCat.direction === "right") {
                evilCat.sprite.body.setVelocityX(evilCat.speed);
            }

            const iscatMovingToTheRight = evilCat.sprite.body.velocity.x > 0;

            // in front and down
            const tileInFrontOfcat = window.groundLayer.getTileAtWorldXY(
                iscatMovingToTheRight
                    ? evilCat.sprite.x + 40
                    : evilCat.sprite.x - 40,
                evilCat.sprite.y + 40
            );

            const isTileInFrontOfcat = Boolean(tileInFrontOfcat);

            const isCatJumping = !evilCat.sprite.body.onFloor();

            if (!isCatJumping) {
                if (evilCat.sprite.body.onWall() || !isTileInFrontOfcat) {
                    const inverseDirection =
                        evilCat.direction === "right" ? "left" : "right";
                    evilCat.direction = inverseDirection;
                }
            }
        }
    });

    // window.platform.setVelocityX(10);
}
