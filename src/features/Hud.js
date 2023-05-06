
export default class Hud {
    currentScene
    playButton;
    graphics;
    lives;

    constructor (scene) {
        this.currentScene = scene;
    }

    loadPlayButton(width, height) {
        this.playButton = this.currentScene.add
        .image(width/2, height/2 * 1.2, "play_button")
        .setInteractive();

        this.playButton.on("pointerdown", () => {
        alert("clicked button");
        });

        this.playButton.setDepth(1);
    }

    createHUD() {
        // Create a graphics object to draw the HUD background
        this.graphics = this.currentScene.add.graphics();

        // Set the fill style to create a transparent background
        this.graphics.fillSyle(0x000000, 0.7);

        // Draw a rectangle to cover the bottom of the screen
        this.graphics.fillRectShape(new Phaser.Geom.Rectangle(0, height * 0.90, width, height * 0.90));
        this.graphics.depth = 1;
    }
    
}

// for loop
// for (initialization; condition; increment/decrement) {
//      code to be executed
//   }