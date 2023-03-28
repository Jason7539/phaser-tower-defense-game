const e = require("express");

class Enemy {
  constructor(type, /*armor,*/ healthAmount, speed, reward, lifeDamage, x, y) {
    this.type = type;
    this.healthAmount = healthAmount;
    this.speed = speed;
    this.reward = reward;
    this.lifeDamage = lifeDamage;
    this.x = x;
    this.y = y;
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
}

const scorpion = new Enemy(ground, 100, 10, 10, 1);
const flyingBug = new Enemy(air, 100, 10, 10, 1);

module.exports = Enemy;