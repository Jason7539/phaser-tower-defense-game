
export default class Hud {
    currentScene;
    playButton;
    graphics;
    towerImages;
    towerFrames;
    rectangleHud;
    towerHud;
    width;
    height;

    constructor (scene, width, height) {
        this.currentScene = scene;
        this.width = width;
        this.height = height;
        this.towerImagesPositions = [
            { x: width * 0.10, y: height * 0.95 },
            { x: width * 0.20, y: height * 0.95 },
            { x: width * 0.30, y: height * 0.9285 },
        ];
        this.towerFrames = [  
            { name: 'arrow', frame: 'Arrow00' },  
            { name: 'splash', frame: 'Splash00' },  
            { name: 'mage', frame: 'Mage00' },
        ];
        this.towerHud = [];
    }

    createPlayButton(assetName) {
        this.playButton = this.currentScene.add
        .image(this.width/2, this.height/2 * 1.2, assetName)
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
        this.graphics.fillStyle(0x000000, 0.7);

        // Draw a rectangle to cover the bottom of the screen
        this.rectangleHud = (new Phaser.Geom.Rectangle(0, this.height * 0.90,this.width, this.height * 0.90));
        this.graphics.fillRectShape(this.rectangleHud);
        this.graphics.depth = 1;
        
    }   
    
    createInteractableTowerImage() {

        for (let i = 0; i < this.towerFrames.length; i++) {
            
            //Grabs data from atlas 'arrow'
            let frameData = this.currentScene.textures.getFrame(this.towerFrames[i].name, this.towerFrames[i].frame);

            //Uses data from frameData and towerImagePositions to create image
            let towerImage = this.currentScene.add.image ( 
                this.towerImagesPositions[i].x,
                this.towerImagesPositions[i].y,
                frameData.texture.key, 
                frameData.name
                );
            towerImage.setScale(0.60);

            //towerImage.towerProperties = towerClassInstance[i];

            
            // Enaables interactivity for image
            towerImage.setInteractive();

            
            let cursorText = `Tower ${i + 1}`;
            //Make cursorTextLocation null so that it is not always happening, avoiding dupes
            let cursorTextLocation = null;
                
            //Makes tooltip of tower over cursor
            towerImage.on('pointerover', (pointer) => {
              if (!cursorTextLocation) {
                cursorTextLocation = this.currentScene.add.text(pointer.x, pointer.y, cursorText, {fontSize: '16px', fill: '#ffffff'});
                cursorTextLocation.setOrigin(0.1);
                cursorTextLocation.depth = 2;
                //Just testing to see data about mouse for practice can delete  later
                console.log(pointer);
              }
            });
        
            //Deletes the tooltip when cursor leaves tower
            towerImage.on('pointerout', () => {
              console.log('event triggered');
              if (cursorTextLocation) {
                cursorTextLocation.destroy();
                cursorTextLocation = null;
              }
            });

            towerImage.on('pointerdown', () => {

            });
            

            //Loads towerImage
            this.towerHud.push(towerImage);
            this.towerHud[i].depth = 1
            this.towerHud[i].setVisible(true);

         };
    }
}

// for loop
// for (initialization; condition; increment++/decrement--) {
//     code to be executed
//   }

