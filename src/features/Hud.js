
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
    towerPlacementMode;
    

    constructor (scene, width, height) {
        this.currentScene = scene;
        this.width = width;
        this.height = height;
        this.towerImagesPositions = [
            { x: width * 0.10, y: height * 0.95 },
            { x: width * 0.20, y: height * 0.95 },
            { x: width * 0.30, y: height * 0.95 },
        ];
        this.towerFrames = [  
            { name: 'arrow', frame: 'Arrow00' },  
            { name: 'splash', frame: 'Splash00' },  
            { name: 'mage', frame: 'Mage00' },
        ];
        this.gridData = this.manageGridData();
        this.towerHud = [];
        this.cloneImage = null;
        this.towerPlacementMode = false;
        
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

        levelText.setDepth(2);
    }

    createLivesText() {
        let livesText = this.currentScene.add.text(800, 15, "Lives:50", {
        fontSize: "32px",
        fill: "#000",
        });

        livesText.setDepth(2);
    }

    createGrid() {
        let grid = this.currentScene.add.grid(0, 0, this.width, this.height, 64, 64,).setOutlineStyle(0xb038d7);
        grid.depth = 1;
        grid.setOrigin(0,0);
        //tower image dimensions are w 64 h 128 so maybe cell width and height 64
    }

    //Figure out way to make this instance variable so i can return to method checkIfCellIsEmpty
    manageGridData() {
        this.gridData = [
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,],
            [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        ];
        
        return this.gridData;
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
                frameData.name,
            );
            //Gives refrence to properties to this.towerHud[i] towerImage -> So when i push to towerHud I am able to grab properties
            towerImage.Properties = towerClassInstances[i];

            //Can maybe add both towerName and goldCost to nother method
            //Add goldcost to image
            let goldCostText = this.currentScene.add.text( 
                this.towerImagesPositions[i].x,
                this.towerImagesPositions[i].y, 
                towerClassInstances[i].cost, 
                {fontSize: '16px', fill: '#00ff00'}
            );
            goldCostText.depth = 2;
            goldCostText.setOrigin(-1.25,-1.5);
            
            //Add tower name to image
            let towerNameText = this.currentScene.add.text(
                this.towerImagesPositions[i].x,
                this.towerImagesPositions[i].y,
                towerClassInstances[i].name,
                {fontSize: '16px', fill: '#00ff00'}
            );
            towerNameText.depth = 2;
            towerNameText.setOrigin(.5, 3);
            
            //Loads towerImage but you can just use towerImage instead of creating towerHud
            this.towerHud.push(towerImage);
            this.towerHud[i].depth = 2;
            this.towerHud[i].setVisible(true);
            this.towerHud[i].setScale(0.60);
            this.towerHud[i].setInteractive();

        };
    }

    createTowerOutline(pluginName) {
        for (let i = 0; i < this.towerHud.length; i++) {
            let outlinePipeline = this.currentScene.plugins.get(pluginName).add(this.towerHud[i]);

            // Set initial outline
            outlinePipeline.setOutlineColor(0xffffff); // Set the outline color to transparent
            outlinePipeline.setThickness(1.5); // Set the outline thickness 

            this.towerHud[i].on ('pointerover', () => {
                // Add red outline effect
                outlinePipeline.setOutlineColor(0xc41c00); 
                outlinePipeline.setThickness(1.5); 
            });   

            this.towerHud[i].on('pointerout', () => {
                // removes outline effect manually by setting to initial outline
                outlinePipeline.setOutlineColor(0xffffff);
                outlinePipeline.setThickness(1.5);
            });
        }
    }

    //Works but need to change some things before finalizing make it happen when we place tower
    buyTowers(econ) {
        for (let i = 0; i < this.towerHud.length; i++) {
            this.towerHud[i].on ('pointerdown', (event) => {
                if (event.button === 0) {
                    econ.subtractMoney(this.towerHud[i].Properties.cost);
                    console.log(this.towerHud[i].Properties.cost);
                }
            });    
        }
    }

    //Still need to add more logic for selling tower
    sellTowers(econ) {
        for (let i = 0; i < this.towerHud.length; i++) {
            this.towerHud[i].on ('pointerdown', (event) => {
                if (event.button === 0) {
                    econ.addMoney(Math.floor(this.towerHud[i].Properties.cost * 0.75));
                }
            });    
        }
    }

    startPlacementMode() {
        for (let i = 0; i < this.towerHud.length; i++) {
            //Activates towerPlacementMode activating cursor lock
            this.towerHud[i].on('pointerdown', (event) => {
                if (event.button === 0) { 

                    this.towerPlacementMode = true;
                    this.selectedTower = this.towerHud[i]; //If u dont make this variable next scope has problem with cloneImage
                    this.currentScene.input.mouse.requestPointerLock();

                } 
            });
        }
        
        //Creates image that moves with cursor bc of PointerLock
        this.currentScene.input.on('pointermove', (pointer) => {
          if (this.towerPlacementMode && this.currentScene.input.mouse.locked && this.selectedTower) {
                if (!this.cloneImage) {
                    // Create a copy of the tower image to move around
                    this.cloneImage = this.currentScene.add.image(pointer.x, pointer.y, this.selectedTower.texture.key);
                    this.cloneImage.setAlpha(0.5);
                    this.cloneImage.depth = 2;
                    this.cloneImage.setScale(0.55);
                }
      
                let pointerMovementSpeed = 0.7;
                // Move the tower image with the mouse pointer 
                this.cloneImage.x += pointer.movementX * pointerMovementSpeed;
                this.cloneImage.y += pointer.movementY * pointerMovementSpeed;
        
                // Force the sprite to stay on screen
                this.cloneImage.x = Phaser.Math.Wrap(this.cloneImage.x, 0, this.width);
                this.cloneImage.y = Phaser.Math.Wrap(this.cloneImage.y, 0, this.height);
            }
        });
    }

    //Maybe add collision to method
    placeTower() {
        this.currentScene.input.on('pointerdown', () => {
            if (this.towerPlacementMode && this.currentScene.input.mouse.locked && this.cloneImage) {
                let row = Math.floor(this.cloneImage.x / 64);
                let col = Math.floor(this.cloneImage.y / 64);
                
                let gridSnapX = row * 64 + 64 / 2;
                let gridSnapY = col * 64 + 24; //24 is y location
                
                if (this.checkIfCellIsEmpty(row, col)) {
                    let towerSprite = this.currentScene.add.sprite(gridSnapX, gridSnapY, this.selectedTower.texture.key);
                    towerSprite.depth = 1;
                    towerSprite.setScale(0.55);
                    this.gridData[row][col] = 1;
                    console.log(this.selectedTower.Properties.name);
                    console.log(towerSprite.x);
                    
                }
            }
        });
    }

    stopPlacementMode()  {
        //Cancel tower placement mode and destroy and null clone
        this.currentScene.input.keyboard.on('keydown-Q', () => { 
            if (this.towerPlacementMode === true && this.currentScene.input.mouse.locked)  { 
              this.towerPlacementMode = false;
              this.currentScene.input.mouse.releasePointerLock();
                if (this.cloneImage) {
                    this.cloneImage.destroy();
                    this.cloneImage = null;
                    // Can remove
                    console.log(this.cloneImage);
                }
            }
        });      
    }

    //Maybe rename canPlaceTurret
    checkIfCellIsEmpty(row,col) {
        let cellValue = this.gridData[row][col];
        console.log(cellValue);
        return cellValue === 0;
        
    }    

}

//If adding image or text make .depth = 1
//Note to fix mage tower go into asperite sprite->canvas cut to 128 and move layer 1 then redo json files

//Things to add
    //Some type of confirm before placing turret
    //Green tint or outline for area you can place tower or could be white outline of 64x64 cell
    //.setTint(0x00FF00)
    