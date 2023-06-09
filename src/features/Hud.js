
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

    createLevelsText() {
        //Maybe change fontFamily later
        let levelText = this.currentScene.add.text(425, 15, "Level:1/5", {
        fontSize: "32px",
        fill: "#000",
        });

        levelText.setDepth(1);
    }

    createLivesText() {
        let livesText = this.currentScene.add.text(812, 15, "Lives:50", {
        fontSize: "32px",
        fill: "#000",
        });

        livesText.setDepth(1);
    }

    createGrid() {
        let grid = this.currentScene.add.grid(0, 0, this.width, this.height, 64, 64,).setOutlineStyle(0xb038d7);
        grid.depth = 1;
        grid.setOrigin(0,0);
        //tower image dimensions are w 64 h 128 so maybe cell width and height 64
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
    
    createTowerImage(towerClassInstances) {
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
            //Gives refrence to properties to gameobject towerImage -> So when i push to towerHud I am able to grab properties
            towerImage.Properties = towerClassInstances[i];

            //Add goldcost to image
            let goldCostText = this.currentScene.add.text( 
                this.towerImagesPositions[i].x,
                this.towerImagesPositions[i].y, 
                towerClassInstances[i].cost, 
                {fontSize: '16px', fill: '#00ff00'}
            );
            goldCostText.depth = 1;
            goldCostText.setOrigin(-1.25,-1.5);
            
            //Add tower name to image
            let towerNameText = this.currentScene.add.text(
                this.towerImagesPositions[i].x,
                this.towerImagesPositions[i].y,
                towerClassInstances[i].name,
                {fontSize: '16px', fill: '#00ff00'}
            );
            towerNameText.depth = 1;
            towerNameText.setOrigin(.5, 3);
            
            //Loads towerImage but you can just just towerImage instead of creating towerHud
            this.towerHud.push(towerImage);
            this.towerHud[i].depth = 1
            this.towerHud[i].setVisible(true);
            this.towerHud[i].setScale(0.60);
            this.towerHud[i].setInteractive();

         };
    }

    createEventsForTowers(econ) {

        for (let i = 0; i < this.towerHud.length; i++) {
            this.towerHud[i].on ('pointerdown', () => {
                econ.subtractMoney(this.towerHud[i].Properties.cost);
                console.log(this.towerHud[i].Properties.cost);
                
            });    
        }
    }

    //Maybe add later into createEventsForTowers method
    createOutline(pluginName) {

        for (let i = 0; i < this.towerHud.length; i++) {
            let outlinePipeline = this.currentScene.plugins.get(pluginName).add(this.towerHud[i]);

            // Set initial outline
            outlinePipeline.setOutlineColor(0xffffff); // Set the outline color to transparent
            outlinePipeline.setThickness(1.5); // Set the outline thickness to 

            this.towerHud[i].on ('pointerover', () => {
                // Add red outline effect
                outlinePipeline.setOutlineColor(0xc41c00); 
                outlinePipeline.setThickness(1.5); 
            });   

            this.towerHud[i].on('pointerout', () => {
                // removes outline effect manually by setting to initial outline
                outlinePipeline.setOutlineColor(0xffffff); // Set the outline color to transparent
                outlinePipeline.setThickness(1.5); // Set the outline thickness to 0
              });
        }
    }

}

//If adding image or text make .depth = 1
//Note to fix mage tower go into asperite sprite->canvas cut to 128 and move layer 1 then redo json files
