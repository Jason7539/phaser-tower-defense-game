//Start at line 44
export default class towerHud {
    currentScene;
    towerName
    towerCost
    towerInfo

    constructor(scene) {
        this.currentScene = scene;
    }

    createHUD() {
        // Create a graphics object to draw the HUD background
        this.graphics = scene.add.graphics();

        // Set the fill style to create a transparent background
        this.graphics.fillStyle(0x000000, 0.5);

        // Draw a rectangle to cover the bottom of the screen
        this.graphics.fillRect(0, height - 100, width, 100);
        or fillRectShape(new Phaser.Geom.Rectangle(0, height * 0.75, width, height * 0.25));
    }


    displayTowerInfo()
}