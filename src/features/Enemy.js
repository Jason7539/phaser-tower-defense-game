const e = require("express");

class Enemy {
  constructor(name, healthAmount, speed, reward, lifeDamage) {
    this.name = name;
    this.healthAmount = healthAmount;
    this.speed = speed;
    this.reward = reward;
    this.lifeDamage = lifeDamage
  }

  losingHealth(towerDamage) {
    this.healthAmount -= towerDamage
  }

  /*gainingGold(totalMoney) {
    this.reward += totalMoney
  }*/
}

const scorpion = new Enemy('Scorpion', 100, 10, 10, 1);
const air = new Enemy('Flying bug', 100, 10, 10, 1);

module.exports = Enemy;