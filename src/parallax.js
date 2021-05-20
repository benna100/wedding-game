const viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

export default function (scene) {
    const backgroundSizeForParallax = 15 * 70;

    scene.parallaxMountainBg = scene.add.tileSprite(
        0,
        0,
        viewportWidth,
        viewportHeight,
        "parallax-mountain-bg"
    );

    scene.parallaxMountainBg.setOrigin(0, 0);
    scene.parallaxMountainBg.setScrollFactor(0);

    scene.parallaxMountainBg.depth = -1;
    scene.parallaxMountainBg.setScale(
        backgroundSizeForParallax /
            scene.textures.list["parallax-mountain-bg"].source[0].height /
            1.4
    );

    scene.parallaxMountainForegroundTrees = scene.add.tileSprite(
        0,
        400,
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
                .height /
            2.3
    );
}
