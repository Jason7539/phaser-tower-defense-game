// This is the entry point of your game.

const width = 1024;
const height = 1024;

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#4488aa',
  scene: { preload, create },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("play_button", "play_button.png");
  this.load.image("gold", "gold.png");
  //this.load.image('tiles', 'public\Grass_Tileset.png');
  //this.load.tilemapTiledJSON('tilemap', 'src\map01.json');
  
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

  goldImage = this.add.image(30, 25, 'gold');
  goldImage = this.add.text(65, 15, '0', { fontSize: '32px', fill: '#000', });
  //Maybe change fontFamily later

  levelText = this.add.text(425, 15, 'Level:1/5', { fontSize: '32px', fill: '#000',});

  livesText = this.add.text(812, 15, 'Lives:50', { fontSize: '32px', fill: '#000',});

}

//Towers
//var arrowTower = {
  //level: 1, damage: 0, range: 0, upgradeCost: 0,
//Enemies
//var enemy  = {
 // x= 0, y= 0,health: 0, speed: 0, reward: 0, 
//var airEnemy = {
  //x= 0, y= 0,health: 0, speed: 0, reward: 0, 
 // this.load.spritesheet('arrowTower', "public\Towers\Arrow Tower\Tower 01.png", {frameWidth: 64, framHeight:  128 })
  //maybe go look at different way to do spriteshee