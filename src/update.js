let enemyDirection = "left";

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

    if (enemyDirection === "left") {
        window.enemy.body.setVelocityX(-200);
    } else if (enemyDirection === "right") {
        window.enemy.body.setVelocityX(200);
    }

    const hasReachedLeftBorder = window.enemy.x < 10;

    const isEnemyMovingToTheRight = window.enemy.body.velocity.x > 0;

    // in front and down
    const tileInFrontOfEnemy = window.groundLayer.getTileAtWorldXY(
        isEnemyMovingToTheRight ? enemy.x + 10 : enemy.x - 10,
        enemy.y + 10
    );

    const hasReachedRightBorder =
        window.enemy.x > window.groundLayer.width - 10;
    if (
        (hasReachedLeftBorder || !Boolean(tileInFrontOfEnemy)) &&
        enemyDirection === "left"
    ) {
        enemyDirection = "right";
    } else if (
        (hasReachedRightBorder || !Boolean(tileInFrontOfEnemy)) &&
        enemyDirection == "right"
    ) {
        enemyDirection = "left";
    }

    // if (!tileInFrontOfEnemy && enemyDirection === "left") {
    //     enemyDirection = "right";
    // } else if (!tileInFrontOfEnemy && enemyDirection == "right") {
    //     enemyDirection = "left";
    // }
}
