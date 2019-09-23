export default function(scene) {
    const backgroundSizeForParallax = 600;

    scene.parallaxMountainBg = scene.add.tileSprite(
        0,
        0,
        scene.textures.list["parallax-mountain-bg"].source[0].width,
        scene.textures.list["parallax-mountain-bg"].source[0].height,
        "parallax-mountain-bg"
    );

    scene.parallaxMountainBg.setOrigin(0, 0);
    scene.parallaxMountainBg.setScrollFactor(0);

    scene.parallaxMountainBg.depth = -1;
    scene.parallaxMountainBg.setScale(
        backgroundSizeForParallax /
            scene.textures.list["parallax-mountain-bg"].source[0].height
    );

    scene.parallaxMountainForegroundTrees = scene.add.tileSprite(
        0,
        0,
        scene.textures.list["parallax-mountain-foreground-trees"].source[0]
            .width,
        scene.textures.list["parallax-mountain-foreground-trees"].source[0]
            .height,
        "parallax-mountain-foreground-trees"
    );

    scene.parallaxMountainForegroundTrees.setOrigin(0, 0);
    scene.parallaxMountainForegroundTrees.setScrollFactor(0);

    scene.parallaxMountainForegroundTrees.depth = -1;
    scene.parallaxMountainForegroundTrees.setScale(
        backgroundSizeForParallax /
            scene.textures.list["parallax-mountain-foreground-trees"].source[0]
                .height
    );
}
