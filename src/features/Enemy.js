const e = require("express");

export default class Enemy {
  type;
  healthAmount;
  speed;
  reward;
  lifeDamage;
  currentScence;
  x;
  y;
  startPointLayer;
  endPointLayer;

  constructor(type, healthAmount, speed, reward, lifeDamage, scene, x, y) {
    this.type = type;
    this.healthAmount = healthAmount;
    this.speed = speed;
    this.reward = reward;
    this.lifeDamage = lifeDamage;
    this.currentScence = scene;
    this.x = x;
    this.y = y;
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

  startPoint() {
    const startPointObject = this.startPointLayer.objects.find(
      (object) =>
        object.properties.find((prop) => prop.name === "StartPoint").value === "200"
    );
  }

  endPoint() {
    const endPointObject = this.endPointLayer.objects.find(
      (object) =>
        object.properties.find((prop) => prop.name === "EndPoint").value === "200"
    );
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

}

const flyingBug = new Enemy(air, 100, 10, 10, 1);



/*Questions
Can my method name be the same as a const?
How do i know if i used const and this correctly?
startPointLayer = map.getObjectLayer("Start")
Whenever i git commit should i push?*/
