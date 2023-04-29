import Tower from "./tower";

const e = require("express");

export default class Enemy {
  type;
  healthAmount;
  speed;
  reward;
  lifeDamage;
  currentScene;
  startPointLayer;
  endPointLayer;

  constructor(type, healthAmount, speed, reward, lifeDamage, scene, load,) {
    this.type = type;
    this.healthAmount = healthAmount;
    this.speed = speed;
    this.reward = reward;
    this.lifeDamage = lifeDamage;
    this.currentScene = scene;
    this.startPointLayer = map.getObjectLayer("Start");
    this.endPointLayer = map.getObjectLayer("End");
    this.load = load;
    /*if (type === "ground") {
      this.collider = scene.physics.add.collider(this.sprite, Tower, null, null, this);
    } else if (type ==='air') {
      this.sprite.setIgnoreGravity(true);
    }*/
  }

  takeDamage(damage) {
    this.healthAmount -= damage
    
  }
  
  getReward(){
    if (this.healthAmount === 0) {
      return this.reward
    }
  }

  losingLives() {
     lives -= this.lifeDamage
  }

  getStartPoint() {
    const startPointObject = this.currentScene.startPointLayer.objects.find(
      (object) =>
        object.properties.find((prop) => prop.name === "StartPoint").value === "200"
    );
    return startPointObject;
  }

  getEndPoint() {
    const endPointObject = this.currentScene.endPointLayer.objects.find(
      (object) =>
        object.properties.find((prop) => prop.name === "EndPoint").value === "200"
    );
    return endPointObject;
  }

  getPath() {
    const path = new Phaser.Curves.Path(this.currentScene);
    const startPointObject = this.getStartPoint();
    const endPointObject = this.getEndPoint();
    path.moveTo(startPointObject.x, startPointObject.y);
    path.lineTo(endPointObject.x, endPointObject.y);
    const startPoint = new Phaser.Math.Vector2(startPointObject.x, startPointObject.y,);
    const endPoint = new Phaser.Math.Vector2(endPointObject.x, endPointObject.y);
    return {path, startPoint, endPoint};
  }

  //Just added
  animation() {
    this.load.atlas("scorpion", "Scorpion.png", "Scorpion.json");
    this.currentScene.anims.create({
      key: "moving_left",
      frames: this.currentScene.anims.generateFrameNames("scorpion", {
        prefix: "Walk",
        end: 7,
        zeroPad: 3,
      }),
      repeat: -1,
    });
    this.currentScene.anims.create({
      key: "up",
      frames: this.currentScene.anims.generateFrameNames("scorpion", {
        prefix: "U",
        end: 7,
        zeroPad: 3,
      }),
      repeat: -1,
    });
    this.currentScene.anims.create({
      key: "down",
      frames: this.currentScene.anims.generateFrameNames("scorpion", {
        prefix: "D",
        end: 7,
        zeroPad: 3,
      }),
      repeat: -1,
    });
  }

  enemySpawn() {
    const animation = this.getAnimation();
    const startPointObject = this.getStartPoint();
    const { path, startPoint, endPoint } = this.getPath();

    //ask about path or using this.get
    const follower = this.currentScene.add.follower(path, startPointObject.x, startPointObject.y, animation);
    follower.startFollow({
      duration: 10000,
      ease: "Linear",
      anims: this.currentScene.anims,
    });

    this.currentScene.time.addEvent({
      delay: 5,
      loop: true,
      callback: () => {
        const { x, y } = follower;
        const angle = Phaser.Math.Angle.BetweenPoints(startPoint, endPoint);

        if (
          (angle > -Math.PI && angle <= (-3 * Math.PI) / 4) ||
          (angle >= Math.PI / 4 && angle <= Math.PI)
        ) {
          follower.anims.play("moving_left", true);
          follower.setFlipX(true);
        } else if (angle > Math.PI / 4 && angle <= (3 * Math.PI) / 4) {
          follower.anims.play("down", true);
          follower.setFlipX(false);
        } else if (angle > (-3 * Math.PI) / 4 && angle <= -Math.PI / 4) {
          follower.anims.play("moving_left", true);
          follower.setFlipX(false);
        } else {
          follower.anims.play("up", true);
          follower.setFlipX(false);
        }
      }
    });
  }

  /*getDistanceToTarget(tower) {
    const startPointObject = this.getStartPoint();
    const dx = startPointObject.x - tower.x;
    const dy = startPointObject.y - tower.y;
    const distance = Math.sqrt(dx*dx + dy*dy)
    return distance;
  }*/
}



Questions
/*Can my method name be the same as a const?
How do i know if i used const and this correctly?
startPointLayer = map.getObjectLayer("Start")
Whenever i git commit should i push?
*/
