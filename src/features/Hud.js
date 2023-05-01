// Starting practice move button from line 41-49 from mainScene into hud.
export default class Hud {
    currentScene
    playButton;

    constructor (scene) {
        this.currentScene = scene;
    }

    loadPlayButton(width, height,) {
        this.playButton = this.currentScene.add
        .image(width/2, height/2 * 1.2, "play_button")
        .setInteractive();

        this.playButton.on("pointerdown", () => {
        alert("clicked button");
        });

        this.playButton.setDepth(1);
    }
}
