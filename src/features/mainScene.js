// This is the entry point of your game.

import Economy from "./economy.js";
import Enemy from "./EnemyV2.js";
import Hud from "./Hud.js";

const width = 1024;
const height = 1024;

const config = {
  width,
  height,
  type: Phaser.AUTO,
  backgroundColor: "#4488aa",
  scene: { preload, create },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.tilemapTiledJSON("map", "map01.json");
  this.load.image("tiles", "Grass_Tileset.png");
  this.load.image("play_button", "play_button.png");
  this.load.image("gold", "gold.png");
  this.load.atlas("scorpion", "Scorpion.png", "Scorpion.json");
  this.load.atlas("arrow", "arrowTower.png", "arrowTower.json");
  this.load.atlas("splash", "splashTower.png", "splashTower.json");
  this.load.atlas("mage", "mageTower.png", "mageTower.json");
}

//Level needs to change when all enemies are dead
var level = 1;
var levelText;

var lives = 50;
var livesText;

function create() {
  let econ = new Economy(0, this, "gold");
  
  let startbutton = new Hud(this);

  startbutton.loadPlayButton(width, height);

  let graphics = this.add.graphics();
  graphics.fillStyle(0xFFA500, 0.7);
  let rectangle = new Phaser.Geom.Rectangle(0, height * 0.75, width, height * 0.25)
  let createShape = graphics.fillRectShape(rectangle);
  graphics.depth = 1;
  // console.log(rectangle);
  // console.log(createShape);

  let hello = "hello world!!!!!";
  console.log(hello);
  


  //Background of game
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("Grass_Tileset", "tiles");
  const layer = map.createLayer("Background", tileset);

  //Object layers in tiled called Start and End
  const startPointLayer = map.getObjectLayer("Start");
  const endPointLayer = map.getObjectLayer("End");

  //This is to get x and y for enemies pathing (maybe change startPointObject name)
  const startPointObject = startPointLayer.objects.find(
    (object) =>
      object.properties.find((prop) => prop.name === "StartPoint").value ===
      "200"
  );
  const endPointObject = endPointLayer.objects.find(
    (object) =>
      object.properties.find((prop) => prop.name === "EndPoint").value === "200"
  );

  //Pathing
  const path = new Phaser.Curves.Path();
  path.moveTo(startPointObject.x, startPointObject.y);
  path.lineTo(endPointObject.x, endPointObject.y);
  const startPoint = new Phaser.Math.Vector2(
    startPointObject.x,
    startPointObject.y
  );
  const endPoint = new Phaser.Math.Vector2(endPointObject.x, endPointObject.y);

  // //Animations: control what animations scorpion has access
  // this.anims.create({
  //   key: "moving_left",
  //   frames: this.anims.generateFrameNames("scorpion", {
  //     prefix: "Walk",
  //     end: 7,
  //     zeroPad: 3,
  //   }),
  //   repeat: -1,
  // });
  // this.anims.create({
  //   key: "up",
  //   frames: this.anims.generateFrameNames("scorpion", {
  //     prefix: "U",
  //     end: 7,
  //     zeroPad: 3,
  //   }),
  //   repeat: -1,
  // });
  // this.anims.create({
  //   key: "down",
  //   frames: this.anims.generateFrameNames("scorpion", {
  //     prefix: "D",
  //     end: 7,
  //     zeroPad: 3,
  //   }),
  //   repeat: -1,
  // });

  //Sprite or animation for pathing
  // jason: we have created path. this adds an image to follow that path

  // const follower = this.add.follower(
  //   path,
  //   startPointObject.x,
  //   startPointObject.y,
  //   "scorpion"
  // );
  // follower.startFollow({
  //   duration: 10000,
  //   ease: "Linear",
  //   // anims: this.anims,
  // });

  const scorp = new Enemy(
    "ground",
    100,
    100,
    100,
    100,
    this,
    startPointObject,
    endPointObject
  );

  scorp.spawn(path, startPointObject.x, startPointObject.y, "scorpion");
  scorp.renderEnemyToPath(10000, "Linear");

  //Sprite direction with animation
  // actual playing the animation based direction of enemy
  // this.time.addEvent({
  //   delay: 5,
  //   loop: true,
  //   callback: () => {
  //     const { x, y } = follower;
  //     const angle = Phaser.Math.Angle.BetweenPoints(startPoint, endPoint);

  //     if (
  //       (angle > -Math.PI && angle <= (-3 * Math.PI) / 4) ||
  //       (angle >= Math.PI / 4 && angle <= Math.PI)
  //     ) {
  //       follower.anims.play("moving_left", true);
  //       follower.setFlipX(true);
  //     } else if (angle > Math.PI / 4 && angle <= (3 * Math.PI) / 4) {
  //       follower.anims.play("down", true);
  //       follower.setFlipX(false);
  //     } else if (angle > (-3 * Math.PI) / 4 && angle <= -Math.PI / 4) {
  //       follower.anims.play("moving_left", true);
  //       follower.setFlipX(false);
  //     } else {
  //       follower.anims.play("up", true);
  //       follower.setFlipX(false);
  //     }
  //   }
  // });

  // TODO: call when we create economy. don't reliant on call order.( bring the level of goldImage and gold text to the top of scene)
  econ.render();

  econ.addMoney(150);
  econ.subtractMoney(30);

  //Maybe change fontFamily later
  levelText = this.add.text(425, 15, "Level:1/5", {
    fontSize: "32px",
    fill: "#000",
  });
  livesText = this.add.text(812, 15, "Lives:50", {
    fontSize: "32px",
    fill: "#000",
  });
}
