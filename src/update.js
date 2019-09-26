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

    if (window.cursors.space.isDown) {
        const bullet = this.physics.add.sprite(
            window.player.body.center.x,
            window.player.body.center.y,
            "enemy"
        );
        bullet.setDisplaySize(10, 10);

        // // Turn on wall collision checking for your sprite
        // bullet.setCollideWorldBounds(true);

        // // Turning this on will allow you to listen to the 'worldbounds' event
        // bullet.body.onWorldBounds = true;

        // // 'worldbounds' event listener
        // bullet.body.world.on(
        //     "worldbounds",
        //     function(body) {
        //         // Check if the body's game object is the sprite you are listening for
        //         if (body.gameObject === this) {
        //             // Stop physics and render updates for this object
        //             this.setActive(false);
        //             this.setVisible(false);
        //         }
        //     },
        //     bullet
        // );

        bullet.body.setVelocityX(window.player.flipX ? -600 : 600);
        bullet.body.setVelocityY(-200);
        console.log(bullet);

        // bullet._events.onOutOfBounds.add(function(obj) {
        //     obj.kill();
        // }, this);
    }

    // jump
    if (window.cursors.up.isDown && window.player.body.onFloor()) {
        window.player.body.setVelocityY(-500);
    }

    window.cats.forEach(cat => {
        // improve, remove from the cats array
        if (cat.atlas.body) {
            if (cat.direction === "left") {
                cat.atlas.body.setVelocityX(-200);
            } else if (cat.direction === "right") {
                cat.atlas.body.setVelocityX(200);
            }

            const hasReachedLeftBorder = cat.atlas.x < 10;

            const iscatMovingToTheRight = cat.atlas.body.velocity.x > 0;

            // in front and down
            const tileInFrontOfcat = window.groundLayer.getTileAtWorldXY(
                iscatMovingToTheRight ? cat.atlas.x + 10 : cat.atlas.x - 10,
                cat.atlas.y + 10
            );

            const hasReachedRightBorder =
                cat.atlas.x > window.groundLayer.width - 10;
            if (
                (hasReachedLeftBorder || !Boolean(tileInFrontOfcat)) &&
                cat.direction === "left"
            ) {
                cat.direction = "right";
            } else if (
                (hasReachedRightBorder || !Boolean(tileInFrontOfcat)) &&
                cat.direction == "right"
            ) {
                cat.direction = "left";
            }
        }
    });
}
