// This is the entry point of your game.

import Economy from "./economy.js";
import Enemy from "./EnemyV2.js";
import Hud from "./Hud.js";
import Tower from "./tower.js";

let width = 1024;
let height = 900;

let config = {
  width,
  height,
  type: Phaser.AUTO,
  backgroundColor: "#4488aa",
  scene: { preload, create },
};

let game = new Phaser.Game(config);

function preload() {
  this.load.plugin('rexoutlinepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexoutlinepipelineplugin.min.js', true);
  this.load.tilemapTiledJSON("map", "map01.json");
  this.load.image("tiles", "Grass_Tileset.png");
  this.load.image("play_button", "play_button.png");
  this.load.image("gold", "gold.png");
  this.load.atlas("scorpion", "Scorpion.png", "Scorpion.json");
  this.load.atlas("arrow", "arrowTower.png", "arrowTower.json");
  this.load.atlas("splash", "splashTower.png", "splashTower.json");
  this.load.atlas("mage", "mageTower.png", "mageTower.json");
}


function create() {
  //Economy classes
  let econ = new Economy(100, this, "gold");
  
  //Hud classes
  let startbutton = new Hud(this, width, height);
  let grid = new Hud(this, width, height);
  let topHud = new Hud(this, width, height);
  let bottomHud = new Hud(this, width, height);

  //Tower classes
  let arrow = new Tower(5, 50, 5, 2, 50,);
  arrow.name = 'Arrow';
  let siege = new Tower(5, 50, 5, 5, 50,);
  siege.name = 'Siege';
  let mage = new Tower(10, 50, 5, 5, 50,);
  mage.name = 'Mage';
  let towerClassInstances = [ arrow, siege, mage ]; 

  //Hud class methods
  startbutton.createPlayButton("play_button");
  grid.createGrid();
  topHud.createLevelsText();
  topHud.createLivesText();
  bottomHud.createHUD();
  bottomHud.createTowerImage(towerClassInstances);
  bottomHud.createEventsForTowers(econ);
  bottomHud.createOutline('rexoutlinepipelineplugin');


  //Background of game
  let map = this.make.tilemap({ key: "map" });
  let tileset = map.addTilesetImage("Grass_Tileset", "tiles");
  let layer = map.createLayer("Background", tileset);

  //Object layers in tiled called Start and End
  let startPointLayer = map.getObjectLayer("Start");
  let endPointLayer = map.getObjectLayer("End");

  //This is to get x and y for enemies pathing (maybe change startPointObject name)
  let startPointObject = startPointLayer.objects.find(
    (object) =>
      object.properties.find((prop) => prop.name === "StartPoint").value ===
      "200"
  );
  let endPointObject = endPointLayer.objects.find(
    (object) =>
      object.properties.find((prop) => prop.name === "EndPoint").value === "200"
  );

  //Pathing
  let path = new Phaser.Curves.Path();
  path.moveTo(startPointObject.x, startPointObject.y);
  path.lineTo(endPointObject.x, endPointObject.y);
  let startPoint = new Phaser.Math.Vector2(
    startPointObject.x,
    startPointObject.y
  );
  let endPoint = new Phaser.Math.Vector2(endPointObject.x, endPointObject.y);

  

  let scorp = new Enemy(
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


  // TODO: call when we create economy. don't reliant on call order.( bring the level of goldImage and gold text to the top of scene)
  econ.render();

  econ.addMoney(150);
  econ.subtractMoney(30);

}
 
