// This is the entry point of your game.

const width = 1024;
const height = 1024;

const config = {
  width,
  height,
  type: Phaser.AUTO,
  backgroundColor: '#4488aa',
  scene: { preload, create },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.tilemapTiledJSON('map', 'map01.json');
  this.load.image('tiles', 'Grass_Tileset.png');
  this.load.image("play_button", "play_button.png");
  this.load.image("gold", "gold.png");
  this.load.atlas('scorpion', 'Scorpion.png', 'Scorpion.json');

}

//Gold bar on hud
var gold = 100
var goldImage

//Level needs to change when all enemies are dead
var level = 1
var levelText

var lives = 50
var livesText

function create() {
  const centerX = width / 2;
  const centerY = height / 2;

  let playButton = this.add
    .image(centerX, centerY * 1.2, "play_button")
    .setInteractive();

  playButton.on("pointerdown", () => {
    alert("clicked button");

  });

  playButton.setDepth(1);

  //background of game
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage("Grass_Tileset", 'tiles');
  const layer = map.createLayer('Background', tileset);

  //Object layer in tiled called Start
  const startPointLayer = map.getObjectLayer('Start');
  //Object layer in tiled called End
  const endPointLayer = map.getObjectLayer('End');

  //This is to get x and y for enemies pathing (maybe change startPointObject name)
  const startPointObject = startPointLayer.objects.find(object => object.properties.find(prop => prop.name === 'StartPoint').value === '200');
  const endPointObject = endPointLayer.objects.find(object => object.properties.find(prop => prop.name === 'EndPoint').value === '200');

  //Pathing
  const path = new Phaser.Curves.Path();
  path.moveTo(startPointObject.x, startPointObject.y);
  path.lineTo(endPointObject.x, endPointObject.y);
  const startPoint = new Phaser.Math.Vector2(startPointObject.x, startPointObject.y);
  const endPoint = new Phaser.Math.Vector2(endPointObject.x, endPointObject.y);

  //Animations
  this.anims.create({ key: 'moving_left', frames: this.anims.generateFrameNames('scorpion', { prefix: 'Walk', end: 7, zeroPad: 3 }), repeat: -1 });
  this.anims.create({ key: 'up', frames: this.anims.generateFrameNames('scorpion', { prefix: 'U', end: 7, zeroPad: 3 }), repeat: -1 });
  this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('scorpion', { prefix: 'D', end: 7, zeroPad: 3 }), repeat: -1 });

  //Sprite or animation for pathing
  const groundScorpion = this.add.sprite(startPointObject.x, startPointObject.y, 'scorpion').play('moving_left')
  const follower = this.add.follower(path, startPointObject.x, startPointObject.y, 'scorpion');
  follower.startFollow({
    duration: 10000,
    ease: 'Sine.easeInOut',
    rotateToPath: false,
    verticalAdjust: true,
    anims: this.anims,
    animsKey: 'down',
  });

  //Use to see if follower in path is working correctly
  //follower.play('moving_left');

  //Sprite direction with animation
  this.time.addEvent({
    delay: 5,
    loop: true,
    callback: () => {
      const { x, y } = follower;
      const angle = Phaser.Math.Angle.BetweenPoints(startPoint, endPoint);

      if ((angle > -Math.PI && angle <= -3 * Math.PI / 4) || (angle >= Math.PI / 4 && angle <= Math.PI)) { 
        follower.anims.play('moving_left', true);
        follower.setFlipX(true);
       
      } else if (angle > Math.PI / 4 && angle <= 3 * Math.PI / 4) {
        follower.anims.play('down', true);
        follower.setFlipX(false);
        
      } else if (angle > -3 * Math.PI / 4 && angle <= -Math.PI / 4) {
        follower.anims.play('moving_left', true);
        follower.setFlipX(false);
        
      } else {
        follower.anims.play('up', true);
        follower.setFlipX(false);
        
      }
    }
  });

  //Use these to see if it is working or getting x and y
  console.log("startPointObject.x = " + startPointObject.x);
  console.log("startPointObject.y = " + startPointObject.y);
  console.log(startPointLayer);

  goldImage = this.add.image(30, 25, 'gold');
  goldImage = this.add.text(65, 15, '=0', { fontSize: '32px', fill: '#000', });

  //Maybe change fontFamily later
  levelText = this.add.text(425, 15, 'Level:1/5', { fontSize: '32px', fill: '#000', });
  livesText = this.add.text(812, 15, 'Lives:50', { fontSize: '32px', fill: '#000', });


}
