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

    if (viewportWidth < 700) {
    }
    scene.parallaxMountainBg = scene.add.tileSprite(
        viewportWidth < 700 ? -50 : 0,
        viewportWidth < 700 ? -80 : 0,
        viewportWidth,
        viewportHeight,
        "parallax-mountain-bg"
    );

    scene.parallaxMountainBg.setOrigin(0, 0);
    scene.parallaxMountainBg.setScrollFactor(0);

    scene.parallaxMountainBg.depth = -1;
    const magicNumber = viewportWidth < 700 ? 40 : 0;
    scene.parallaxMountainBg.setScale(
        backgroundSizeForParallax /
            (scene.textures.list["parallax-mountain-bg"].source[0].height -
                magicNumber) /
            1.4
    );

    scene.parallaxMountainForegroundTrees = scene.add.tileSprite(
        viewportWidth < 700 ? -50 : 0,
        viewportWidth < 700 ? -80 : 0,
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
            (scene.textures.list["parallax-mountain-foreground-trees"].source[0]
                .height -
                magicNumber) /
            1.4
    );
}
