import Enemy from "./Enemy.js";

export default class Tower {
    constructor(damage, range, attackSpeed, targeting, cost, upgradeCost, maxLevel, x, y) {
        this.damage = damage;
        this.range = range;
        this.attackSpeed = attackSpeed;
        this.targeting = targeting;
        this.cost = cost;
        this.upgradeCost = upgradeCost;
        this.maxLevel = 1;
        this.x = x;
        this.y = y;
        this.assetName = assetName;
    }      

    //Possible methods

    sell(){
        return this.cost * 0.75;
    }

    attack(enemy) {
        const distance = this.getDistancetoTarget(enemy);
        if (distance <= this.range) {
            enemy.takeDamage(this.damage);
        }
    }

    getDistancetoTarget(enemy) {
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }
    
    upgradeTower() {
        if (this.maxLevel == 1) {
            /*totalmoney -= this.upgradeCost*/
            this.damage * 1.2;
            this.range * 1.2;
            this.attackSpeed * 1.2;
            this.maxLevel++;
        } else if (this.maxLevel == 2) {
            this.damage * 1.4;
            this.range * 1.4;
            this.attackSpeed * 1.4;
            this.maxLevel++;
        }
    }
}

const arrow = new Tower(5, 50, 5, singletarget, 2, 50,);
const siege = new Tower(5, 50, 5, splash, 5, 50,);
const mage = new Tower(10, 50, 5, singletarget, 5, 50,);

module.exports = Tower;