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
  this.load.image('tiles','Grass_Tileset.png');
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

//Enemies
const enemy = {
  health: 100,
  speed: 5,
  reward: 10,
};

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
  const map = this.make.tilemap({key:'map'});
  const tileset = map.addTilesetImage("Grass_Tileset", 'tiles');
  const layer = map.createLayer('Background', tileset);

  //const map = new Tilemap (this,)

  //Object layer in tiled called Start
  const startPointLayer = map.getObjectLayer('Start');
  const endPointLayer = map.getObjectLayer('End')
  const scorpionSpawnObject = startPointLayer.objects.find(object => object.properties.find(prop => prop.name === 'StartPoint').value === '200');
  const endPointObject = endPointLayer.objects.find(object => object.properties.find(prop => prop.name === 'EndPoint').value === '200')

  this.anims.create({ key: 'moving', frames: this.anims.generateFrameNames('scorpion', {prefix: 'Walk', end: 7, zeroPad:3}), repeat: -1});
  this.anims.create({ key: 'up', frames: this.anims.generateFrameNames('scorpion', {prefix: 'U', end: 7, zeroPad: 3}), repeat: -1});
  this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('scorpion', {prefix: 'D', end: 7, zeroPad: 3}), repeat: -1});
  
  const scorpion = this.add.sprite(scorpionSpawnObject.x, scorpionSpawnObject.y, 'scorpion').play('down');

  //Use these to see if it is working or getting x and y
  console.log("scorpionSpawnObject.x = " + scorpionSpawnObject.x);
  console.log("scorpionSpawnObject.y = " + scorpionSpawnObject.y);
  console.log(startPointLayer);

  goldImage = this.add.image(30, 25, 'gold');
  goldImage = this.add.text(65, 15, '=0', { fontSize: '32px', fill: '#000', });
  //Maybe change fontFamily later

  levelText = this.add.text(425, 15, 'Level:1/5', { fontSize: '32px', fill: '#000',});

  livesText = this.add.text(812, 15, 'Lives:50', { fontSize: '32px', fill: '#000',});

  
}

function update ()
{

}
