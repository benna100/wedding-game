export default function update(time, delta) {
    this.parallaxMountainBg.tilePositionX =
        this.cameras.cameras[0].scrollX * 0.1;
    this.parallaxMountainForegroundTrees.tilePositionX =
        this.cameras.cameras[0].scrollX * 0.2;

    this.parallaxMountainBg.tilePositionY =
        this.cameras.cameras[0].scrollY * 0.15;
    this.parallaxMountainForegroundTrees.tilePositionY =
        this.cameras.cameras[0].scrollY * 0.25;

    if (window.cursors.left.isDown) {
        window.player.body.setVelocityX(-200);
        window.player.anims.play("walk", true); // walk left
        window.player.flipX = true; // flip the sprite to the left
    } else if (window.cursors.right.isDown) {
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
    if (window.cursors.up.isDown && window.player.body.onFloor()) {
        window.player.body.setVelocityY(-500);
    }

    window.cats.forEach(cat => {
        // improve, remove from the cats array
        if (cat.sprite.body) {
            if (Phaser.Math.Between(0, 300) === 0) {
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
}
