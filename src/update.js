let enemyDirection = "left";

export default function update(time, delta) {
  this.parallaxMountainBg.tilePositionX = this.cameras.cameras[0].scrollX * 0.1;
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
  const hasReachedrightBorder = window.enemy.x > window.groundLayer.width - 10;
  if (hasReachedLeftBorder && enemyDirection === "left") {
    enemyDirection = "right";
  } else if (hasReachedrightBorder && enemyDirection == "right") {
    enemyDirection = "left";
  }
}
