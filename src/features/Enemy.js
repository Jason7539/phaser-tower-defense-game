const e = require("express");

export default class Enemy {
  type;
  healthAmount;
  speed;
  reward;
  lifeDamage;
  scene;
  x;
  y;
  startPointLayer;
  endPointLayer;

  constructor(type, healthAmount, speed, reward, lifeDamage, scene,) {
    this.type = type;
    this.healthAmount = healthAmount;
    this.speed = speed;
    this.reward = reward;
    this.lifeDamage = lifeDamage;
    this.scene = scene;
    this.startPointLayer = map.getObjectLayer("Start");
    this.endPointLayer = map.getObjectLayer("End");
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

  getDistanceToTarget(tower) {
    const dx = this.x - tower.x;
    const dy = this.y - tower.y;
    const distance = Math.sqrt(dx*dx + dy*dy)
    return distance;
  }

  getStartPoint() {
    const startPointObject = this.startPointLayer.objects.find(
      (object) =>
        object.properties.find((prop) => prop.name === "StartPoint").value === "200"
    );
    return startPointObject;
  }

  getEndPoint() {
    const endPointObject = this.endPointLayer.objects.find(
      (object) =>
        object.properties.find((prop) => prop.name === "EndPoint").value === "200"
    );
    return endPointObject;
  }

  getPath() {
    const path = new Phaser.Curves.Path();
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
    this.anims.create({
      key: "moving_left",
      frames: this.anims.generateFrameNames("scorpion", {
        prefix: "Walk",
        end: 7,
        zeroPad: 3,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNames("scorpion", {
        prefix: "U",
        end: 7,
        zeroPad: 3,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNames("scorpion", {
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
    const follower = this.add.follower(path, startPointObject.x, startPointObject.y, animation);
    follower.startFollow({
      duration: 10000,
      ease: "Linear",
      anims: this.anims,
    });

    this.time.addEvent({
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
}




Questions
/*Can my method name be the same as a const?
How do i know if i used const and this correctly?
startPointLayer = map.getObjectLayer("Start")
Whenever i git commit should i push?
*/
